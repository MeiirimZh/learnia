import { useState, useEffect, useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../../navigation/types";

import useCards from "../../../../hooks/useCards";

import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../../../../components/AppText";
import TextButton from "../../../../../components/buttons/TextButton";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../../theme";

import { shuffle } from "../../../../utils/random";

type Props = StackScreenProps<SetsStackParamList, "ReviewSet">;

export default function ReviewSet({ navigation, route }: Props) {
    const set = route.params.set;

    const { cards, loading } = useCards(set?.id);

    const [ shuffledCards, setShuffledCards ] = useState<typeof cards>([]);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ showFront, setShowFront ] = useState<boolean>(true);
    const [ finished, setFinished ] = useState<boolean>(false);
    const [ wrongAnswersCount, setWrongAnswerCount ] = useState<number>(0);
    const [ correctAnswerCount, setCorrectAnswersCount ] = useState<number>(0);

    useEffect(() => {
        if (cards.length > 0) {
            setShuffledCards(shuffle(cards));
        }
    }, [cards]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set?.title
        });
    }, []);

    const nextQuestionAndCheckFinished = () => {
        if (currentIndex + 1 < shuffledCards.length) {
            setCurrentIndex(currentIndex + 1);
            setShowFront(true);
        }
        else {
            setFinished(true);
        }
    };

    const markCorrectAnswer = () => {
        setCorrectAnswersCount(correctAnswerCount + 1);
    };

    const markWrongAnswer = () => {
        setWrongAnswerCount(wrongAnswersCount + 1);
    };

    if (loading) {
        return (
            <View style={ styles.container }>
                <ActivityIndicator size="large" color={ theme.colors.primary } />
            </View>
        );
    }

    if (finished) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.lg, padding: theme.spacing.lg }}>
                <Ionicons name="star" color={ theme.colors.secondary } size={ 50 } />
                <AppText style={{ fontFamily: theme.fonts.semibold, fontSize: 20 }}>Просмотр завершен!</AppText>
                <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                    <View style={ styles.result }>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Ionicons name="checkmark-circle-outline" color={ theme.colors.success } size={ 24 } />
                            <AppText>{ correctAnswerCount }</AppText>
                        </View>
                        <AppText>Правильные ответы</AppText>
                    </View>
                    <View style={ styles.result }>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Ionicons name="close-circle-outline" color={ theme.colors.danger } size={ 24 } />
                            <AppText>{ wrongAnswersCount }</AppText>
                        </View>
                        <AppText>Неправильные ответы</AppText>
                    </View>
                </View>
                <TextButton text="Вернуться" onPress={() => 
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "SetsList" }
                        ],
                    })
                } onLongPress={() => {}} />
            </View>
        )
    } else {
        return (
            <View style={ styles.container }>
                <View style={ styles.cardContainer }>
                    <TouchableOpacity 
                        style={ [ styles.card, styles.shadow ] }
                        onPress={ () => setShowFront(prev => !prev) }>
                        <AppText style={{ fontSize: 24 }}>
                            { showFront ? shuffledCards[currentIndex]?.front : shuffledCards[currentIndex]?.back }
                        </AppText>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.sm }}>
                    <TouchableOpacity 
                        style={ [styles.button, { backgroundColor: theme.colors.danger }, styles.shadow] }
                        onPress={ () => {
                            markWrongAnswer();
                            nextQuestionAndCheckFinished();
                        }}>
                        <AppText style={{ color: theme.colors.onPrimary, fontFamily: theme.fonts.semibold }}>Неправильно</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={ [styles.button, { backgroundColor: theme.colors.success }, styles.shadow] }
                        onPress={ () => {
                            markCorrectAnswer();
                            nextQuestionAndCheckFinished();
                        }}>
                        <AppText style={{ color: theme.colors.onPrimary, fontFamily: theme.fonts.semibold }}>Правильно</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.lg,
        padding: theme.spacing.md
    },

    cardContainer: {
        flex: 1,

        padding: theme.spacing.sm
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight
    },

    button: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        padding: theme.spacing.md
    },

    result: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        backgroundColor: theme.colors.bgLight,

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