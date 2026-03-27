import { SQLiteDatabase } from "expo-sqlite";
import * as StudiedCardsQueries from "../database/queries/StudiedCardsQueries";
import * as CompletedTestsQueries from "../database/queries/CompletedTestsQueries";

import { getNowFormatted, getCurrentWeek, getFormattedDate } from "./date";

import { StudiedCard, CompletedTest, WeekProgress } from "../../types";

export const addStudiedCard = async (db: SQLiteDatabase, cardId: number, is_correct: 1 | 0) => {
    await db.runAsync(StudiedCardsQueries.INSERT, [
        cardId,
        getNowFormatted(),
        is_correct
    ]);
};

export const deleteStudiedCards = async (db: SQLiteDatabase, studiedCards: StudiedCard[]) => {
    studiedCards.forEach(async (studiedCard) => {
        await db.runAsync(StudiedCardsQueries.DELETE, [
            studiedCard.id
        ]);
    });
};

export const getCardsWeekProgress = (studiedCards: StudiedCard[]): WeekProgress => {
    const progress: WeekProgress = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
    };

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = getCurrentWeek();

    studiedCards.forEach((studiedCard) => {
        const studiedAt = studiedCard.studied_at.split("-").slice(0, 3).join("-");

        switch (studiedAt) {
            case getFormattedDate(monday):
                progress.monday += 1;
                break;
            case getFormattedDate(tuesday):
                progress.tuesday += 1;
                break;
            case getFormattedDate(wednesday):
                progress.wednesday += 1;
                break;
            case getFormattedDate(thursday):
                progress.thursday += 1;
                break;
            case getFormattedDate(friday):
                progress.friday += 1;
                break;
            case getFormattedDate(saturday):
                progress.saturday += 1;
                break;
            case getFormattedDate(sunday):
                progress.sunday += 1;
                break;
        }
    });

    return progress;
};

export const getTestsWeekProgress = (completedTests: CompletedTest[]): WeekProgress => {
    const progress: WeekProgress = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
    };

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = getCurrentWeek();

    completedTests.forEach((completedTest) => {
        const completedAt = completedTest.completed_at.split("-").slice(0, 3).join("-");

        switch (completedAt) {
            case getFormattedDate(monday):
                progress.monday += 1;
                break;
            case getFormattedDate(tuesday):
                progress.tuesday += 1;
                break;
            case getFormattedDate(wednesday):
                progress.wednesday += 1;
                break;
            case getFormattedDate(thursday):
                progress.thursday += 1;
                break;
            case getFormattedDate(friday):
                progress.friday += 1;
                break;
            case getFormattedDate(saturday):
                progress.saturday += 1;
                break;
            case getFormattedDate(sunday):
                progress.sunday += 1;
                break;
        }
    });

    return progress;
};

export const deleteStudiedCardsById = async (db: SQLiteDatabase, studiedCards: StudiedCard[], cardId: number) => {
    studiedCards.forEach(async (studiedCard) => {
        if (studiedCard.card_id === cardId) {
            await db.runAsync(StudiedCardsQueries.DELETE, [
                cardId
            ]);
        }
    });
};

export const addCompletedTest = async (db: SQLiteDatabase, testId: number, score: number) => {
    await db.runAsync(CompletedTestsQueries.INSERT, [
        testId,
        score,
        getNowFormatted()
    ]);
};

export const deleteCompletedTest = async (db: SQLiteDatabase, completedTests: CompletedTest[], testId: number | null) => {
    completedTests.forEach(async (completedTest) => {
        if (completedTest.test_id === testId) {
            await db.runAsync(CompletedTestsQueries.DELETE, [
                testId
            ]);
        }
    });
};