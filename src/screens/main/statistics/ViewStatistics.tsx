import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import useCards from "../../../hooks/useCards";
import useTests from "../../../hooks/useTests";
import useStudiedCards from "../../../hooks/useStudiedCards";
import useCompletedTests from "../../../hooks/useCompletedTests";

import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";
import ProgressBar from "../../../../components/statistics/ProgressBar";
import { BarChart } from "react-native-gifted-charts";

import { theme } from "../../../theme";

import { getCardsWeekProgress, getTestsWeekProgress } from "../../../utils/userProgress";

import { WeekProgress } from "../../../../types";

type Mode = "today" | "week" | "all time";

export default function ViewStatistics() {
    const { cards, loading } = useCards();
    const { tests } = useTests();
    const { studiedCards } = useStudiedCards();
    const { completedTests } = useCompletedTests();

    const [ cardsWeekProgress, setCardsWeekProgress ] = useState<WeekProgress | null>(null);
    const [ testsWeekProgress, setTestsWeekProgress ] = useState<WeekProgress | null>(null);

    const [ mode, setMode ] = useState<Mode>("today");

    const getTodayCardsProgress = (studied: number, total: number) => {
        return total > 0 ? Math.min(studied / total, 1) : 0;
    };

    const getTodayTestsProgress = (completed: number, total: number) => {
        return total > 0 ? Math.min(completed / total, 1) : 0;
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                setMode("today");
            };
        }, [])
    );

    useEffect(() => {
        setCardsWeekProgress(getCardsWeekProgress(studiedCards));
    }, [cards, studiedCards]);

    useEffect(() => {
        setTestsWeekProgress(getTestsWeekProgress(completedTests));
    }, [tests, completedTests]);

    if (loading) {
        return <AppText>Загрузка...</AppText>;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.navMenu }>
                <TouchableOpacity 
                    style={[
                         styles.navMenuButton,
                         {
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            backgroundColor: mode === "today" ? theme.colors.lightPrimary : theme.colors.primary
                         } 
                    ]}
                    onPress={ () => setMode("today") }>
                    <AppText style={{ color: theme.colors.onPrimary }}>Сегодня</AppText>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                         styles.navMenuButton,
                         {
                            backgroundColor: mode === "week" ? theme.colors.lightPrimary : theme.colors.primary
                         }
                    ]}
                    onPress={ () => setMode("week") }>
                    <AppText style={{ color: theme.colors.onPrimary }}>Неделя</AppText>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                         styles.navMenuButton,
                         {
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            backgroundColor: mode === "all time" ? theme.colors.lightPrimary : theme.colors.primary
                         } 
                    ]}
                    onPress={ () => setMode("all time") }>
                    <AppText style={{ color: theme.colors.onPrimary }}>Все время</AppText>
                </TouchableOpacity>
            </View>
            { mode === "today" &&
            <>
            <View style={ styles.block }>
                <View style={ styles.headerWithNumbers }>
                    <AppText style={ styles.headerText }>Карточек изучено</AppText>
                    <AppText>{ studiedCards.length }/{ cards.length }</AppText>
                </View>
                <ProgressBar progress={ getTodayCardsProgress(studiedCards.length, cards.length) } />
            </View>
            <View style={ styles.block }>
                <View style={ styles.headerWithNumbers }>
                    <AppText style={ styles.headerText }>Тестов пройдено</AppText>
                    <AppText>{ completedTests.length }/{ tests.length }</AppText>
                </View>
                <ProgressBar progress={ getTodayTestsProgress(completedTests.length, tests.length) } />
            </View>
            </>
            }

            { mode === "week" &&
            <ScrollView contentContainerStyle={{ gap: theme.spacing.lg }} showsVerticalScrollIndicator={ false }>
            <View style={ styles.block }>
                <AppText style={ styles.headerText }>Карточек изучено</AppText>
                <BarChart 
                    data={[ 
                        { value: cardsWeekProgress?.monday, label: 'Пн', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.tuesday, label: 'Вт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.wednesday, label: 'Ср', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.thursday, label: 'Чт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.friday, label: 'Пт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.saturday, label: 'Сб', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: cardsWeekProgress?.sunday, label: 'Вс', labelTextStyle: { color: theme.colors.textMuted } },
                    ]}
                    barWidth={ 10 }
                    frontColor={ theme.colors.secondary }
                    noOfSections={ 3 }
                    isAnimated />
            </View>
            <View style={ styles.block }>
                <AppText style={ styles.headerText }>Тестов пройдено</AppText>
                <BarChart 
                    data={[ 
                        { value: testsWeekProgress?.monday, label: 'Пн', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.tuesday, label: 'Вт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.wednesday, label: 'Ср', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.thursday, label: 'Чт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.friday, label: 'Пт', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.saturday, label: 'Сб', labelTextStyle: { color: theme.colors.textMuted } },
                        { value: testsWeekProgress?.sunday, label: 'Вс', labelTextStyle: { color: theme.colors.textMuted } },
                    ]}
                    barWidth={ 10 }
                    frontColor={ theme.colors.secondary }
                    noOfSections={ 3 }
                    isAnimated />
            </View>
            </ScrollView> 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.lg,
        padding: theme.spacing.md
    },

    navMenu: {
        flexDirection: 'row'
    },
    headerWithNumbers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    block: {
        gap: theme.spacing.md
    },

    navMenuButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: theme.colors.primary,

        padding: theme.spacing.md
    },
    
    headerText: {
        fontFamily: theme.fonts.semibold
    }
});