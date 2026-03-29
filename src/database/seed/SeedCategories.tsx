import { SQLiteDatabase } from "expo-sqlite";
import * as CategoriesQueries from "../queries/CategoriesQueries";

export const seedCategories = async (db: SQLiteDatabase) => {
    await db.runAsync(CategoriesQueries.INSERT, [
        "Физика",
        "#34C924"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Программирование",
        "#7851A9"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Английский язык",
        "#2271B3"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "История",
        "#79553D"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Музыка",
        "#EE204D"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Химия",
        "#d645cf"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Социология",
        "#f6ef24"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "AI",
        "#f79f3c"
    ]);

    await db.runAsync(CategoriesQueries.INSERT, [
        "Экономика",
        "#1c9b2b"
    ]);
};