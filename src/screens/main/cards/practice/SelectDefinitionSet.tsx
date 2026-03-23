import { useState, useEffect, useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../../navigation/types";

import useCards from "../../../../hooks/useCards";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../../../../../components/AppText";

import { theme } from "../../../../theme";

import { shuffle } from "../../../../utils/random";

type Props = StackScreenProps<SetsStackParamList, "SelectDefinitionSet">;

export default function SelectDefinitionSet({ navigation, route }: Props) {
    const set = route.params.set;

    const { cards, loading } = useCards(set?.id);

    const [ shuffledCards, setShuffledCards ] = useState<typeof cards>([]);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
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

    if (finished) {
        return (
            <View />
        )
    } else {
        return (
            <View style={ styles.container }>
                <View style={ styles.cardContainer }>
                    <View style={[ styles.card, styles.shadow ]}>
                        <AppText style={{ fontSize: 24 }}>{ shuffledCards[currentIndex]?.front }</AppText>
                    </View>
                </View>
                <View>
                    <TouchableOpacity><AppText>Определение</AppText></TouchableOpacity>
                    <TouchableOpacity><AppText>Определение</AppText></TouchableOpacity>
                    <TouchableOpacity><AppText>Определение</AppText></TouchableOpacity>
                    <TouchableOpacity><AppText>Определение</AppText></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    shadow: {
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});