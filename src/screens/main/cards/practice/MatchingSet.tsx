import { useState, useEffect, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useCards from "../../../../hooks/useCards";

import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../../../../components/AppText";
import StudyResult from "../../../../../components/menus/StudyResult";

import { theme } from "../../../../theme";

import { shuffle } from "../../../../utils/random";
import { addStudiedCard } from "../../../../utils/userProgress";

type Props = StackScreenProps<SetsStackParamList, "MatchingSet">;

export default function MatchingSet({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const set = route.params.set;

    const db = useSQLiteContext();
    const { cards, loading } = useCards(set?.id);

    const [ shuffledCards, setShuffledCards ] = useState<typeof cards>([]);
    const [ frontCards, setFrontCards ] = useState<typeof cards>([]);
    const [ backCards, setBackCards ] = useState<typeof cards>([]);
    const [ isInitialized, setIsInitialized ] = useState<boolean>(false);
    const [ selectedFrontId, setSelectedFrontId ] = useState<number | null | undefined>();
    const [ selectedBackId, setSelectedBackId ] = useState<number | null | undefined>();
    const [ finished, setFinished ] = useState<boolean>(false);
    const [ wrongAnswersCount, setWrongAnswersCount ] = useState<number>(0);
    const [ correctAnswersCount, setCorrectAnswersCount ] = useState<number>(0);

    const removeCard = (id: number) => {
        setFrontCards(prev => prev.filter(card => card.id !== id));
        setBackCards(prev => prev.filter(card => card.id !== id));
    };

    const markCorrectAnswer = async (id: number) => {
        await addStudiedCard(db, id, 1);
        setCorrectAnswersCount(correctAnswersCount + 1);
    };

    const markWrongAnswer = async (id: number) => {
        await addStudiedCard(db, id, 0);
        setWrongAnswersCount(wrongAnswersCount + 1);
    };

    useEffect(() => {
        if (cards.length > 0) {
            setShuffledCards(shuffle(cards));
        }
    }, [cards]);

    useEffect(() => {
        if (shuffledCards.length > 0) {
            setFrontCards(shuffle(shuffledCards));
            setBackCards(shuffle(shuffledCards));

            setIsInitialized(true);
        }
    }, [shuffledCards]);

    useEffect(() => {
        if (selectedFrontId && selectedBackId) {
            if (selectedFrontId === selectedBackId) {
                removeCard(selectedFrontId);
                markCorrectAnswer(selectedFrontId);
            } else {
                markWrongAnswer(selectedFrontId);
            }

            setSelectedFrontId(null);
            setSelectedBackId(null);
        }
    }, [selectedFrontId, selectedBackId]);

    useEffect(() => {
        if (isInitialized && frontCards.length === 0) {
            setFinished(true);
        }
    }, [frontCards, isInitialized]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set?.title
        });
    }, []);

    if (loading) {
        return (
            <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
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
    }

    return (
        <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
            <FlatList 
                data={ frontCards }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[ 
                            styles.cardButton,
                            { backgroundColor: item.id == selectedFrontId ? theme.colors.primary : theme.colors.bgLight, }
                        ]}
                        onPress={() => {
                            setSelectedFrontId(item.id);
                        }}>
                        <AppText style={{ color: item.id == selectedFrontId ? theme.colors.onPrimary : theme.colors.text }}>
                            { item.front }
                        </AppText>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />} />
            <FlatList 
                data={ backCards }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[ 
                            styles.cardButton,
                            { backgroundColor: item.id == selectedBackId ? theme.colors.primary : theme.colors.bgLight, }
                        ]}
                        onPress={() => {
                            setSelectedBackId(item.id);
                        }}>
                        <AppText style={{ color: item.id == selectedBackId ? theme.colors.onPrimary : theme.colors.text }}>
                            { item.back }
                        </AppText>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />} />
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: theme.spacing.md,
        padding: theme.spacing.md
    },
    cardButton: {
        justifyContent:  'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: theme.spacing.md
    }
});