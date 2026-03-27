import { useState, useEffect, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useCards from "../../../../hooks/useCards";

import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../../../../components/AppText";
import StudyResult from "../../../../../components/menus/StudyResult";

import { theme } from "../../../../theme";

import { shuffle } from "../../../../utils/random";
import { addStudiedCard } from "../../../../utils/userProgress";

type Props = StackScreenProps<SetsStackParamList, "ReviewSet">;

export default function ReviewSet({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const set = route.params.set;

    const db = useSQLiteContext();
    const { cards, loading } = useCards(set?.id);

    const [ shuffledCards, setShuffledCards ] = useState<typeof cards>([]);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ showFront, setShowFront ] = useState<boolean>(true);
    const [ finished, setFinished ] = useState<boolean>(false);
    const [ wrongAnswersCount, setWrongAnswersCount ] = useState<number>(0);
    const [ correctAnswersCount, setCorrectAnswersCount ] = useState<number>(0);

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

    const markCorrectAnswer = async () => {
        await addStudiedCard(db, shuffledCards[currentIndex]?.id, 1);
        setCorrectAnswersCount(correctAnswersCount + 1);
    };

    const markWrongAnswer = async () => {
        await addStudiedCard(db, shuffledCards[currentIndex]?.id, 0);
        setWrongAnswersCount(wrongAnswersCount + 1);
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
            <StudyResult
                correctAnswersCount={ correctAnswersCount }
                wrongAnswersCount={ wrongAnswersCount }
                onReturn={() =>
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "SetsList" }
                        ],
                })}/>
        )
    } else {
        return (
            <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
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

    shadow: {
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});