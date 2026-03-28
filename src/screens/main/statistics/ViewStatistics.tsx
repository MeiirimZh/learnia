import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import useNotes from "../../../hooks/useNotes";
import useCategories from "../../../hooks/useCategories";
import useSets from "../../../hooks/useSets";
import useCards from "../../../hooks/useCards";
import useTests from "../../../hooks/useTests";
import useStudiedCards from "../../../hooks/useStudiedCards";
import useCompletedTests from "../../../hooks/useCompletedTests";

import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import ProgressBar from "../../../../components/statistics/ProgressBar";
import { BarChart, PieChart } from "react-native-gifted-charts";

import { theme } from "../../../theme";

import { getCardsWeekProgress, getTestsWeekProgress, getDistributionByCategories } from "../../../utils/userProgress";

import { WeekProgress } from "../../../../types";

type Mode = "today" | "week" | "all time";

export default function ViewStatistics() {
    const { notes } = useNotes();
    const { categories, loading } = useCategories();
    const { sets } = useSets();
    const { cards } = useCards();
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

    const getPieChartData = () => {
        const distribution = getDistributionByCategories(categories, cards, sets, tests);
        return categories.map((category) => ({
            value: Number(distribution[category.id]),
            color: category.color
        }));
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
                    <View>
                        <AppText style={ styles.headerText }>Карточек изучено</AppText>
                        <AppText style={ styles.descText }>Количество изученных карточек за текущий день</AppText>
                    </View>
                    <AppText>{ studiedCards.length }/{ cards.length }</AppText>
                </View>
                <ProgressBar progress={ getTodayCardsProgress(studiedCards.length, cards.length) } />
            </View>
            <View style={ styles.block }>
                <View style={ styles.headerWithNumbers }>
                    <View>
                        <AppText style={ styles.headerText }>Тестов пройдено</AppText>
                        <AppText style={ styles.descText }>Количество пройденных тестов за текущий день</AppText>
                    </View>
                    <AppText>{ completedTests.length }/{ tests.length }</AppText>
                </View>
                <ProgressBar progress={ getTodayTestsProgress(completedTests.length, tests.length) } />
            </View>
            </>
            }

            { mode === "week" &&
            <ScrollView contentContainerStyle={{ gap: theme.spacing.lg }} showsVerticalScrollIndicator={ false }>
            <View style={ styles.block }>
                <View>
                    <AppText style={ styles.headerText }>Карточек изучено</AppText>
                    <AppText style={ styles.descText }>Количество изученных карточек за текущую неделю</AppText>
                </View>
                <BarChart 
                    data={[ 
                        { value: cardsWeekProgress?.monday, label: 'Пн', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.tuesday, label: 'Вт', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.wednesday, label: 'Ср', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.thursday, label: 'Чт', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.friday, label: 'Пт', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.saturday, label: 'Сб', labelTextStyle: styles.labelTextStyle },
                        { value: cardsWeekProgress?.sunday, label: 'Вс', labelTextStyle: styles.labelTextStyle },
                    ]}
                    barWidth={ 10 }
                    frontColor={ theme.colors.secondary }
                    noOfSections={ 3 }
                    isAnimated />
            </View>
            <View style={ styles.block }>
                <View>
                    <AppText style={ styles.headerText }>Тестов пройдено</AppText>
                    <AppText style={ styles.descText }>Количество пройденных тестов за текущую неделю</AppText>
                </View>
                <BarChart 
                    data={[ 
                        { value: testsWeekProgress?.monday, label: 'Пн', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.tuesday, label: 'Вт', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.wednesday, label: 'Ср', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.thursday, label: 'Чт', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.friday, label: 'Пт', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.saturday, label: 'Сб', labelTextStyle: styles.labelTextStyle },
                        { value: testsWeekProgress?.sunday, label: 'Вс', labelTextStyle: styles.labelTextStyle },
                    ]}
                    barWidth={ 10 }
                    frontColor={ theme.colors.secondary }
                    noOfSections={ 3 }
                    isAnimated />
            </View>
            </ScrollView> 
            }

            { mode === "all time" &&
            <ScrollView contentContainerStyle={{ gap: theme.spacing.lg }} showsVerticalScrollIndicator={ false }>
                <>
                {
                    categories.length >= 3 ?
                    <View style={ styles.block }>
                        <View>
                            <AppText style={ styles.headerText }>По категориям</AppText>
                            <AppText style={ styles.descText }>Распределение всех материалов по выбранным категориям</AppText>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <PieChart
                                data={ getPieChartData() }
                                radius={ 100 }
                                donut />
                        </View>
                        <View>
                            {categories.map((item) => (
                                <View key={ item.id } style={{ flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' }}>
                                    <View style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: item.color
                                    }} />
                                    <AppText>{ item.name }</AppText>
                                </View>
                            ))}
                        </View>
                    </View> :
                    <AppText>Недостаточно категорий для просмотра</AppText>
                }
                <View style={ styles.block }>
                    <View>
                        <AppText style={ styles.headerText }>Активность</AppText>
                        <AppText style={ styles.descText }>Количество созданных заметок, карточек и тестов</AppText>
                    </View>
                    <BarChart
                        data={[
                            { value: notes.length, label: 'Заметки', labelTextStyle: styles.labelTextStyle },
                            { value: cards.length, label: 'Карточки', labelTextStyle: styles.labelTextStyle },
                            { value: tests.length, label: 'Тесты', labelTextStyle: styles.labelTextStyle }
                        ]}
                        barWidth={ 10 }
                        spacing={ 60 }
                        frontColor={ theme.colors.secondary }
                        noOfSections={ 3 }
                        isAnimated />
                </View>
                </>
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
    },
    descText: {
        color: theme.colors.textMuted
    },
    labelTextStyle: {
        color: theme.colors.textMuted
    }
});