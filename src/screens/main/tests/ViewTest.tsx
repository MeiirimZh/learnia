import { useState, useEffect, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackHandler } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useQuestions from "../../../hooks/useQuestions";
import * as QuestionsQueries from "../../../database/queries/QuestionsQueries";

import { StyleSheet, View, FlatList, Text } from "react-native";
import QuestionItem from "../../../../components/items/QuestionItem";
import FloatingActions from "../../../../components/menus/FloatingActions";
import FloatingActionsButton from "../../../../components/buttons/FloatingActionsButton";

import { theme } from "../../../theme";

type Props = StackScreenProps<TestsStackParamList, "ViewTest">;

export default function ViewTest({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
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
        <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
            <FlatList
                data={ questions }
                renderItem={({ item, index }) => {
                    const deleteSelected = questionsToDelete.includes(item.id);

                    return ( 
                        <QuestionItem 
                            question={ item.question }
                            number={ index + 1 }
                            showDeleteMarker={ isDeleteMode }
                            deleteSelected={ deleteSelected }
                            onPress={ () => {
                                if (isDeleteMode) {
                                    if (questionsToDelete.includes(item.id)) {
                                        setQuestionsToDelete(prev => 
                                            prev.filter(id => id !== item.id)
                                        );
                                    }
                                    else {
                                        setQuestionsToDelete(prev => [...prev, item.id]);
                                    }
                                }
                                else {
                                    navigation.navigate("ViewQuestion", { 
                                        questionId: item.id, 
                                        question: item.question,
                                        is_answer_1_correct: item.is_answer_1_correct,
                                        is_answer_2_correct: item.is_answer_2_correct,
                                        is_answer_3_correct: item.is_answer_3_correct,
                                        is_answer_4_correct: item.is_answer_4_correct,
                                        answer_1: item.answer_1,
                                        answer_2: item.answer_2,
                                        answer_3: item.answer_3,
                                        answer_4: item.answer_4
                                    })
                                }
                            }}
                            onLongPress={() => {
                                if (isDeleteMode) {
                                    setQuestionsToDelete([]);
                                    setIsDeleteMode(false);
                                }
                                else {
                                    setQuestionsToDelete(prev => [...prev, item.id]);
                                    setIsDeleteMode(true);
                                }
                            }} />
                    )
                }}/>

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