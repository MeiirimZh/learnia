import { SQLiteDatabase } from "expo-sqlite";
import * as StudiedCardsQueries from "../database/queries/StudiedCardsQueries";
import * as CompletedTestsQueries from "../database/queries/CompletedTestsQueries";

import { getNowFormatted } from "./date";

import { StudiedCard, CompletedTest } from "../../types";

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