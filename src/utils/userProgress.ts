import { SQLiteDatabase } from "expo-sqlite";
import * as StudiedCards from "../database/queries/StudiedCardsQueries";
import * as CompletedTests from "../database/queries/CompletedTestsQueries";

import { getNowFormatted } from "./date";

export const addStudiedCard = async (db: SQLiteDatabase, card_id: number, is_correct: 1 | 0) => {
    await db.runAsync(StudiedCards.INSERT, [
        card_id,
        getNowFormatted(),
        is_correct
    ]);
};

export const addCompletedTest = async (db: SQLiteDatabase, test_id: number, score: number) => {
    await db.runAsync(CompletedTests.INSERT, [
        test_id,
        score,
        getNowFormatted()
    ]);
};