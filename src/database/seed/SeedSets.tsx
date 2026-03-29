import { SQLiteDatabase } from "expo-sqlite";
import * as SetsQueries from "../queries/SetsQueries";

export const seedSets = async (db: SQLiteDatabase) => {
    // Физика
    await db.runAsync(SetsQueries.INSERT, [
        "Основы механики",
        "2026-03-28",
        "1.0",
        2
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Формулы по кинематике",
        "2026-03-28",
        "2.0.3",
        2
    ]);

    // Программирование
    await db.runAsync(SetsQueries.INSERT, [
        "Основы Python",
        "2026-03-28",
        "1.0",
        3
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Структуры данных",
        "2026-03-29",
        "1.0",
        3
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Алгоритмы",
        "2026-03-29",
        "1.0",
        3
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Основы веб-разработки",
        "2026-03-29",
        "1.0",
        3
    ]);

    // Английский язык
    await db.runAsync(SetsQueries.INSERT, [
        "Everyday English",
        "2026-03-29",
        "1.0",
        4
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Basic Grammar",
        "2026-03-29",
        "1.0",
        4
    ]);

    // История
    await db.runAsync(SetsQueries.INSERT, [
        "История Казахстана",
        "2026-03-29",
        "1.0",
        5
    ]);

    // Музыка
    await db.runAsync(SetsQueries.INSERT, [
        "Ноты и их обозначения",
        "2026-03-28",
        "1.0",
        6
    ]);
};