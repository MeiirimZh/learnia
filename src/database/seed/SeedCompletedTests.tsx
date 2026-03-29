import { SQLiteDatabase } from "expo-sqlite";
import * as CompletedTestsQueries from "../queries/CompletedTestsQueries";

import { getCurrentWeek, getFormattedDateTime } from "../../utils/date";

const addCompletedTests = async (db: SQLiteDatabase, day: Date, count: number) => {
    for (let i = 1; i < count; i++) {
        await db.runAsync(CompletedTestsQueries.INSERT, [
            i,
            80,
            getFormattedDateTime(day)
        ]);
    }
};

export const seedCompletedTests = async (db: SQLiteDatabase) => {
    const now = new Date();
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = getCurrentWeek();

    if (now.getDay() !== 1) {
        await addCompletedTests(db, monday, 2);
    } 
    if (now.getDay() !== 2) {
        await addCompletedTests(db, tuesday, 2);
    }
    if (now.getDay() !== 3) {
        await addCompletedTests(db, wednesday, 3);
    }
    if (now.getDay() !== 4) {
        await addCompletedTests(db, thursday, 2);
    } 
    if (now.getDay() !== 5) {
        await addCompletedTests(db, friday, 1);
    } 
    if (now.getDay() !== 6) {
        await addCompletedTests(db, saturday, 2);
    }
    if (now.getDay() !== 0) {
        await addCompletedTests(db, sunday, 1);
    }
};