import { SQLiteDatabase } from "expo-sqlite";
import * as CategoriesQueries from "./queries/CategoriesQueries";
import * as SetsQueries from "./queries/SetsQueries";
import * as CardsQueries from "./queries/CardsQueries";

export const seedDatabase = async (db: SQLiteDatabase) => {
    await db.runAsync(CategoriesQueries.INSERT, [
        "Английский язык",
        "#4774c3"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Математика",
        "#fc2b0b"
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Абстрактные понятия",
        "2026-03-19",
        "1.0",
        2
    ]);

    await db.runAsync(SetsQueries.INSERT, [
        "Геометрия",
        "2026-03-24",
        "1.0",
        3
    ]);

    await db.runAsync(CardsQueries.INSERT, [
        "Will",
        "Воля",
        1
    ]);

    await db.runAsync(CardsQueries.INSERT, [
        "Hope",
        "Надежда",
        1
    ]);

    await db.runAsync(CardsQueries.INSERT, [
        "Compassion",
        "Сострадание",
        1
    ]);

    await db.runAsync(CardsQueries.INSERT, [
        "Life",
        "Жизнь",
        1
    ]);

    await db.runAsync(CardsQueries.INSERT, [
        "Число Пи",
        "Отношение длины окружности к ее диаметру",
        2
    ]);
};