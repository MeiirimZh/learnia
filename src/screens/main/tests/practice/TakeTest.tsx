import { useState, useEffect, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useQuestions from "../../../../hooks/useQuestions";

import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import AppText from "../../../../../components/AppText";
import StudyResult from "../../../../../components/menus/StudyResult";

import { theme } from "../../../../theme";

import { addCompletedTest } from "../../../../utils/userProgress";

type Props = StackScreenProps<TestsStackParamList, "TakeTest">;
type AnswerKey = "answer_1" | "answer_2" | "answer_3" | "answer_4";

export default function TakeTest({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const db = useSQLiteContext();
    const test = route.params.test;

    const { questions, loading } = useQuestions(test.id);

    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ isMultipleChoice, setIsMultipleChoice ] = useState<boolean>(false);
    const [ finished, setFinished ] = useState<boolean>(false);

    const [ wrongAnswersCount, setWrongAnswersCount ] = useState<number>(0);
    const [ correctAnswersCount, setCorrectAnswersCount ] = useState<number>(0);

    const [ selectedAnswers, setSelectedAnswers ] = useState<boolean[]>([false, false, false, false]);

    const [ userAnswers, setUserAnswers ] = useState<Record<number, string>>({});
    const [ answersResult, setAnswersResult ] = useState<Record<number, number>>({});

    const [ answerGiven, setAnswerGiven ] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: test.title
        });
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const choices =
                `${questions[currentIndex].is_answer_1_correct}` +
                `${questions[currentIndex].is_answer_2_correct}` +
                `${questions[currentIndex].is_answer_3_correct}` +
                `${questions[currentIndex].is_answer_4_correct}`;

            setIsMultipleChoice(choices.replaceAll("0", "").length > 1);

            const savedAnswer = userAnswers[currentIndex];
            if (savedAnswer) {
                setSelectedAnswers(savedAnswer.split("").map(v => v === "1"));
            } else {
                setSelectedAnswers([false, false, false, false]);
            }
        }
    }, [currentIndex, questions]);

    const toggleAnswer = (index: number) => {
        setSelectedAnswers(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (finished) {
        return (
            <StudyResult
                correctAnswersCount={ correctAnswersCount }
                wrongAnswersCount={ wrongAnswersCount }
                onReturn={() =>
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "TestsList" }
                        ],
                })}/>
        );
    }

    const currentResult = answersResult[currentIndex];

    return (
        <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
            <AppText>Вопрос { currentIndex + 1 } из { questions.length }</AppText>
            <AppText>{ isMultipleChoice ? "Несколько ответов" : "Один ответ" }</AppText>

            <AppText style={ styles.questionText }>
                { questions[currentIndex].question }
            </AppText>

            <View style={{ gap: theme.spacing.md, padding: theme.spacing.sm }}>
                {[0, 1, 2, 3].map((i) => {
                    const key = `answer_${i + 1}` as AnswerKey;

                    return (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.answerButton,
                                styles.shadow,
                                {
                                    backgroundColor: selectedAnswers[i]
                                        ? theme.colors.primary
                                        : theme.colors.bgLight
                                }
                            ]}
                            onPress={() => {
                                if (!answerGiven) {
                                    toggleAnswer(i)}
                                }
                            }
                        >
                            <AppText style={{
                                color: selectedAnswers[i]
                                    ? theme.colors.onPrimary
                                    : theme.colors.text
                            }}>
                                {questions[currentIndex][key]}
                            </AppText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={{ gap: theme.spacing.md, padding: theme.spacing.sm }}>
                <TouchableOpacity
                    style={[ styles.moveButton, styles.shadow ]}
                    onPress={async () => {
                        if (!answerGiven) {
                            const userAnswerString = selectedAnswers
                                .map(v => v ? "1" : "0")
                                .join("");

                            const correctAnswerString =
                                `${questions[currentIndex].is_answer_1_correct}` +
                                `${questions[currentIndex].is_answer_2_correct}` +
                                `${questions[currentIndex].is_answer_3_correct}` +
                                `${questions[currentIndex].is_answer_4_correct}`;

                            const isCorrect = userAnswerString === correctAnswerString;

                            const prevResult = answersResult[currentIndex];

                            if (prevResult !== undefined) {
                                if (prevResult === 1) {
                                    setCorrectAnswersCount(prev => prev - 1);
                                } else {
                                    setWrongAnswersCount(prev => prev - 1);
                                }
                            }

                            setUserAnswers(prev => ({
                                ...prev,
                                [currentIndex]: userAnswerString
                            }));

                            setAnswersResult(prev => ({
                                ...prev,
                                [currentIndex]: isCorrect ? 1 : 0
                            }));

                            if (isCorrect) {
                                setCorrectAnswersCount(prev => prev + 1);
                            } else {
                                setWrongAnswersCount(prev => prev + 1);
                            }

                            setSelectedAnswers([false, false, false, false]);

                            setAnswerGiven(true);
                        } else {
                            if (currentIndex < questions.length - 1) {
                                setCurrentIndex(prev => prev + 1);
                                setAnswerGiven(false);
                            } else {
                                await addCompletedTest(db, test.id, Math.round(correctAnswersCount * 100 / questions.length))
                                setFinished(true);
                            }
                        }
                    }}
                >
                    <AppText style={{ 
                        color: theme.colors.onPrimary
                    }}>
                        { answerGiven ? "Продолжить" : "Ответить" }
                    </AppText>
                </TouchableOpacity>

                {currentIndex > 0 && (
                    <TouchableOpacity
                        style={[styles.moveButton, styles.shadow]}
                        onPress={() => {
                            const prevIndex = currentIndex - 1;
                            const prevAnswer = userAnswers[prevIndex];

                            if (prevAnswer) {
                                setSelectedAnswers(prevAnswer.split("").map(v => v === "1"));
                            }

                            setCurrentIndex(prevIndex);
                            setAnswerGiven(true);
                        }}
                    >
                        <AppText style={{ color: theme.colors.onPrimary }}>
                            Назад
                        </AppText>
                    </TouchableOpacity>
                )}
            </View>

            {currentResult !== undefined && (
                <View style={{ gap: theme.spacing.md }}>
                    <AppText
                        style={{
                            alignSelf: 'center',
                            fontFamily: theme.fonts.semibold,
                            fontSize: 16,
                            color: currentResult === 1
                                ? theme.colors.success
                                : theme.colors.danger
                        }}
                    >
                        { currentResult === 1 ? "Правильно!" : "Неправильно!" }
                    </AppText>
                    { currentResult === 0 &&
                    <View>
                        <AppText style={{ alignSelf: 'center', fontFamily: theme.fonts.semibold }}>Правильные ответы:</AppText>
                        { !!questions[currentIndex].is_answer_1_correct && <AppText style={{ alignSelf: 'center' }}>{ questions[currentIndex].answer_1 }</AppText> }
                        { !!questions[currentIndex].is_answer_2_correct && <AppText style={{ alignSelf: 'center' }}>{ questions[currentIndex].answer_2 }</AppText> }
                        { !!questions[currentIndex].is_answer_3_correct && <AppText style={{ alignSelf: 'center' }}>{ questions[currentIndex].answer_3 }</AppText> }
                        { !!questions[currentIndex].is_answer_4_correct && <AppText style={{ alignSelf: 'center' }}>{ questions[currentIndex].answer_4 }</AppText> }
                    </View>
                    }
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.lg,
        padding: theme.spacing.md
    },

    questionText: {
        fontFamily: theme.fonts.semibold,
        fontSize: 16
    },

    answerButton: {
        borderRadius: 10,
        backgroundColor: theme.colors.bgLight,
        padding: theme.spacing.md
    },

    moveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md
    },

    shadow: {
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});