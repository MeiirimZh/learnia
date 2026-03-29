import { SQLiteDatabase } from "expo-sqlite";
import * as StudiedCardsQueries from "../queries/StudiedCardsQueries";

import { getCurrentWeek, getFormattedDateTime } from "../../utils/date";

const addStudiedCards = async (db: SQLiteDatabase, day: Date, count: number) => {
    for (let i = 1; i < count; i++) {
        await db.runAsync(StudiedCardsQueries.INSERT, [
            i,
            getFormattedDateTime(day),
            1
        ]);
    }
};

export const seedStudiedCards = async (db: SQLiteDatabase) => {
    const now = new Date();
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = getCurrentWeek();

    if (now.getDay() !== 1) {
        await addStudiedCards(db, monday, 10);
    } 
    if (now.getDay() !== 2) {
        await addStudiedCards(db, tuesday, 7);
    }
    if (now.getDay() !== 3) {
        await addStudiedCards(db, wednesday, 15);
    }
    if (now.getDay() !== 4) {
        await addStudiedCards(db, thursday, 20);
    } 
    if (now.getDay() !== 5) {
        await addStudiedCards(db, friday, 10);
    } 
    if (now.getDay() !== 6) {
        await addStudiedCards(db, saturday, 21);
    }
    if (now.getDay() !== 0) {
        await addStudiedCards(db, sunday, 9);
    }
};