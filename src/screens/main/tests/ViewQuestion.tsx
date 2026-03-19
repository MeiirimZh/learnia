import { useState, useEffect, useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import * as QuestionsQueries from "../../../database/queries/QuestionsQueries";

import { StyleSheet, View, TextInput, FlatList, TouchableOpacity } from "react-native";
import AnswerInput from "../../../../components/inputs/AnswerInput";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { theme } from "../../../theme";

type Props = StackScreenProps<TestsStackParamList, "ViewQuestion">;

const VERTICAL_PADDING = theme.spacing.md * 2;
const MAX_LINES = 4;
const LINE_HEIGHT = 22;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT + VERTICAL_PADDING;

export default function ViewQuestion({ navigation, route }: Props) {
    const db = useSQLiteContext();

    const questionId = route.params?.questionId ?? null;
    const testId = route.params?.testId ?? null;

    const [ questionHeight, setQuestionHeight ] = useState<number>(LINE_HEIGHT);
    const [ question, setQuestion ] = useState<string>(route.params?.question ?? "");
    const [ answer1, setAnswer1 ] = useState<string>(route.params?.answer_1 ?? "");
    const [ answer2, setAnswer2 ] = useState<string>(route.params?.answer_2 ?? "");
    const [ answer3, setAnswer3 ] = useState<string>(route.params?.answer_3 ?? "");
    const [ answer4, setAnswer4 ] = useState<string>(route.params?.answer_4 ?? "");
    const [ numbersOfCorrectAnswers, setNumbersOfCorrectAnswers ] = useState<number[]>([]);

    useEffect(() => {
        if (questionId) {
            const arr = [route.params?.is_answer_1_correct, route.params?.is_answer_2_correct, route.params?.is_answer_3_correct, route.params?.is_answer_4_correct];
            arr.forEach((element, index) => {
                if (element) setNumbersOfCorrectAnswers(prev => [...prev, index + 1]);
            });
        }
    }, []);

    const showQuestionToast = () => {
        Toast.show({
            type: 'error',
            text1: '⚠️ Ошибка!',
            text2: 'Заполните поле вопроса'
        });
    };

    const showAnswersToast = () => {
        Toast.show({
            type: 'error',
            text1: '⚠️ Ошибка!',
            text2: 'Выберите минимум один правильный вариант ответа'
        });
    };

    const addQuestion = async () => {
        if (!question) {
            throw new Error("question is empty");
        };

        if (numbersOfCorrectAnswers.length === 0) {
            throw new Error("numbersOfCorrectAnswers is empty");
        };

        await db.runAsync(QuestionsQueries.INSERT, [
            question,
            numbersOfCorrectAnswers.includes(1),
            numbersOfCorrectAnswers.includes(2),
            numbersOfCorrectAnswers.includes(3),
            numbersOfCorrectAnswers.includes(4),
            answer1,
            answer2,
            answer3,
            answer4,
            testId
        ]);
    };

    const updateQuestion = async () => {
        if (!question) {
            throw new Error("question is empty");
        };

        if (numbersOfCorrectAnswers.length === 0) {
            throw new Error("numbersOfCorrectAnswers is empty");
        };

        await db.runAsync(QuestionsQueries.UPDATE, [
            question,
            numbersOfCorrectAnswers.includes(1),
            numbersOfCorrectAnswers.includes(2),
            numbersOfCorrectAnswers.includes(3),
            numbersOfCorrectAnswers.includes(4),
            answer1,
            answer2,
            answer3,
            answer4,
            questionId
        ]);
    };

    const handleErrorAndShowToast = (error: unknown) => {
        if (error instanceof Error) {
            if (error.message === "question is empty") {
                showQuestionToast();
            }
            else if (error.message === "numbersOfCorrectAnswers is empty") {
                showAnswersToast();
            }
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: questionId ? "Изменение вопроса" : "Создание вопроса",
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={async () => {
                        if (questionId) {
                            try {
                                await updateQuestion();
                                navigation.goBack();
                            }
                            catch (error) {
                                handleErrorAndShowToast(error);
                            }
                        }
                        else {
                            try {
                                await addQuestion();
                                navigation.goBack();
                            }
                            catch (error) {
                                handleErrorAndShowToast(error);
                            }
                        }
                    }}>
                    <Ionicons name="checkmark" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            )
        });
    }, [question, answer1, answer2, answer3, answer4, numbersOfCorrectAnswers, questionId, testId]);

    const addNumberOfCorrectAnswer = (number: number) => {
        if (!numbersOfCorrectAnswers.includes(number)) {
            setNumbersOfCorrectAnswers(prev => [...prev, number]);
        }
        else {
            setNumbersOfCorrectAnswers(prev => 
                prev.filter(id => id !== number)
            );
        }
    };

    const textInputs = [
        { value: answer1, setValue: setAnswer1, onSelect: () => addNumberOfCorrectAnswer(1), placeholder: "Ответ 1", key: "1" },
        { value: answer2, setValue: setAnswer2, onSelect: () => addNumberOfCorrectAnswer(2), placeholder: "Ответ 2", key: "2" },
        { value: answer3, setValue: setAnswer3, onSelect: () => addNumberOfCorrectAnswer(3), placeholder: "Ответ 3", key: "3" },
        { value: answer4, setValue: setAnswer4, onSelect: () => addNumberOfCorrectAnswer(4), placeholder: "Ответ 4", key: "4" }
    ];

    return (
        <View style={ styles.container }>
            <TextInput
                multiline
                scrollEnabled={ questionHeight >= MAX_HEIGHT }
                onContentSizeChange={(e) => {
                    const contentHeight = e.nativeEvent.contentSize.height;
                    setQuestionHeight(Math.min(contentHeight, MAX_HEIGHT));
                }}
                textAlignVertical="top"
                style={ [styles.textInput, { height: questionHeight }] }
                value={ question }
                onChangeText={ setQuestion }
                placeholder="Вопрос" />
            
            <FlatList
                data={ textInputs }
                renderItem={({ item }) => {
                    return (
                        <AnswerInput
                            value={ item.value }
                            setValue={ item.setValue }
                            selected={ numbersOfCorrectAnswers.includes(Number(item.key)) }
                            onSelect={ item.onSelect }
                            placeholder={ item.placeholder } />
                    )
                }}
                ItemSeparatorComponent={() => (
                    <View style={{ height: theme.spacing.sm }} />
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.lg,
        padding: theme.spacing.md
    },

    textInput: {
        lineHeight: LINE_HEIGHT,
        
        fontSize: 16,

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});