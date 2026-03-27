import { SQLiteDatabase } from "expo-sqlite";
import * as StudiedCards from "../database/queries/StudiedCardsQueries";

import { getNowFormatted } from "./date";

export const addStudiedCard = async (db: SQLiteDatabase, card_id: number, is_correct: 1 | 0) => {
    await db.runAsync(StudiedCards.INSERT, [
        card_id,
        getNowFormatted(),
        is_correct
    ]);
};