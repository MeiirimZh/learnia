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

import { Card } from "../../../../../types";

import { shuffle, getRandomNElementsFromArray } from "../../../../utils/random";
import { addStudiedCard } from "../../../../utils/userProgress";

type Props = StackScreenProps<SetsStackParamList, "SelectDefinitionSet">;

export default function SelectDefinitionSet({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const set = route.params.set;

    const db = useSQLiteContext();
    const { cards, loading } = useCards(set?.id);

    const [ shuffledCards, setShuffledCards ] = useState<typeof cards>([]);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ finished, setFinished ] = useState<boolean>(false);
    const [ wrongAnswersCount, setWrongAnswersCount ] = useState<number>(0);
    const [ correctAnswersCount, setCorrectAnswersCount ] = useState<number>(0);
    const [ cardsOptions, setCardsOptions ] = useState<Card[]>([]);

    const data = cardsOptions.map((card, index) => ({
        id: card.id,
        back: card.back,
        key: String(index),
    }));

    const generateCardsOptions = () => {
        const cardsWithoutCurrentIndex = shuffledCards.filter(
            (_, index) => index !== currentIndex
        );
        const randomCards = getRandomNElementsFromArray(3, cardsWithoutCurrentIndex);
        setCardsOptions(shuffle([shuffledCards[currentIndex], ...randomCards]));
    };

    const nextQuestionAndCheckFinished = () => {
        if (currentIndex + 1 < shuffledCards.length) {
            setCurrentIndex(currentIndex + 1);
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

    useEffect(() => {
        if (cards.length > 0) {
            const shuffled = shuffle(cards);
            setShuffledCards(shuffled);
        }
    }, [cards]);

    useEffect(() => {
        if (shuffledCards.length > 0) {
            generateCardsOptions();
        }
    }, [shuffledCards, currentIndex]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set?.title
        });
    }, []);

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
                    <View style={[ styles.card, styles.shadow ]}>
                        <AppText style={{ fontSize: 24 }}>{ shuffledCards[currentIndex]?.front }</AppText>
                    </View>
                </View>
                <View style={ styles.cardsOptionsContainer }>
                    {data.map((item) => (
                        <TouchableOpacity 
                            key={ item.key }
                            style={[ styles.cardsOptionButton, styles.shadow ]}
                            onPress={ () => {
                                if (item.id === shuffledCards[currentIndex]?.id) {
                                    markCorrectAnswer();
                                } else {
                                    markWrongAnswer();
                                }
                                nextQuestionAndCheckFinished();
                            }}>
                            <AppText numberOfLines={2}>{ item.back }</AppText>
                        </TouchableOpacity>
                    ))}
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
    cardsOptionsContainer: {
        gap: theme.spacing.md,
        padding: theme.spacing.sm
    },

    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight
    },

    cardsOptionButton: {
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

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