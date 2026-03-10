import { useState, useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useQuestions from "../../../hooks/useQuestions";
import * as QuestionsQueries from "../../../database/queries/QuestionsQueries";

import { StyleSheet, View, FlatList, Text } from "react-native";
import AppText from "../../../../components/AppText";
import QuestionItem from "../../../../components/items/QuestionItem";
import FloatingActions from "../../../../components/menus/FloatingActions";
import FloatingActionsButton from "../../../../components/buttons/FloatingActionsButton";

import { theme } from "../../../theme";

type Props = StackScreenProps<TestsStackParamList, "ViewTest">;

export default function ViewTest({ navigation, route }: Props) {
    const db = useSQLiteContext();
    const { test } = route.params;
    const { questions, loadQuestions } = useQuestions(test.id);

    const [ isDeleteMode, setIsDeleteMode ] = useState<boolean>(false);
    const [ questionsToDelete, setQuestionsToDelete ] = useState<number[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: test.title
        });
    }, [test]);

    useEffect(() => {
        const onBackPress = () => {
            if (isDeleteMode) {
                setIsDeleteMode(false);
                setQuestionsToDelete([]);
                return true;
            }

            return false;
        };

        const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => subscription.remove();
    }, [isDeleteMode]);

    const deleteQuestion = async (id: number) => {
        await db.runAsync(QuestionsQueries.DELETE, [
            id
        ]);

        await loadQuestions();
    };

    return (
        <View style={ styles.container }>
            <FlatList
                data={ questions }
                renderItem={({ item, index }) => (
                    <QuestionItem question={ item.question } number={ index + 1 } onPressMain={ () => {} } />
                )} />

            <FloatingActions>
                { isDeleteMode ?
                <FloatingActionsButton name='trash' color={ theme.colors.text } onPress={async () => {
                    await Promise.all(
                        questionsToDelete.map(id => deleteQuestion(id))
                    );
                    setQuestionsToDelete([]);
                    setIsDeleteMode(false);
                }} /> :
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => navigation.navigate("ViewQuestion", { testId: test.id })} />
                }
            </FloatingActions>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});