import { useState } from "react";

import useCards from "../../../hooks/useCards";
import useTests from "../../../hooks/useTests";
import useStudiedCards from "../../../hooks/useStudiedCards";
import useCompletedTests from "../../../hooks/useCompletedTests";

import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";
import ProgressBar from "../../../../components/statistics/ProgressBar";

import { theme } from "../../../theme";

type Mode = "today" | "week" | "all time";

export default function ViewStatistics() {
    const { cards, loading } = useCards();
    const { tests } = useTests();
    const { studiedCards } = useStudiedCards();
    const { completedTests } = useCompletedTests();

    const [ mode, setMode ] = useState<Mode>("today");

    const getTodayCardsProgress = (studied: number, total: number) => {
        return total > 0 ? Math.min(studied / total, 1) : 0;
    };

    const getTodayTestsProgress = (completed: number, total: number) => {
        return total > 0 ? Math.min(completed / total, 1) : 0;
    };

    if (loading) {
        return <AppText>Загрузка...</AppText>;
    }

    return (
        <ScrollView contentContainerStyle={ styles.container }>
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
        </ScrollView>
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