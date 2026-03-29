import { SQLiteDatabase } from "expo-sqlite";
import * as TestsQueries from "../queries/TestsQueries";

export const seedTests = async (db: SQLiteDatabase) => {
    // Экономика
    await db.runAsync(TestsQueries.INSERT, [
        "Основы экономики",
        "2026-03-29",
        "1.0",
        10
    ]);

    await db.runAsync(TestsQueries.INSERT, [
        "Личные финансы",
        "2026-03-29",
        "1.0",
        10
    ]);

    // Химия
    await db.runAsync(TestsQueries.INSERT, [
        "Основы химии",
        "2026-03-29",
        "1.0",
        7
    ]);

    await db.runAsync(TestsQueries.INSERT, [
        "Химические реакции",
        "2026-03-29",
        "1.0",
        7
    ]);

    // Социология
    await db.runAsync(TestsQueries.INSERT, [
        "Основы социологии",
        "2026-03-29",
        "1.0",
        8
    ]);

    // AI
    await db.runAsync(TestsQueries.INSERT, [
        "Основы искусственного интеллекта",
        "2026-03-29",
        "1.0",
        9
    ]);

    await db.runAsync(TestsQueries.INSERT, [
        "Машинное обучение",
        "2026-03-29",
        "1.0",
        9
    ]);

    await db.runAsync(TestsQueries.INSERT, [
        "Нейронные сети",
        "2026-03-29",
        "1.0",
        9
    ]);

    // Английский язык
    await db.runAsync(TestsQueries.INSERT, [
        "Базовый английский",
        "2026-03-29",
        "1.0",
        4
    ]);

    // Музыка
    await db.runAsync(TestsQueries.INSERT, [
        "Основы музыки",
        "2026-03-29",
        "1.0",
        6
    ]);
};