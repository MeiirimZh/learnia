import { SQLiteDatabase } from "expo-sqlite";
import * as CategoriesQueries from "./queries/CategoriesQueries";
import * as SetsQueries from "./queries/SetsQueries";
import * as CardsQueries from "./queries/CardsQueries";
import * as TestsQueries from "./queries/TestsQueries";
import * as QuestionsQueries from "./queries/QuestionsQueries";

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

    await db.runAsync(TestsQueries.INSERT, [
        "Геометрия",
        "2026-03-25",
        "1.0",
        3
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Сколько градусов в сумме углов треугольника?",
        1, 0, 0, 0,
        "180°",
        "90°",
        "360°",
        "270°",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Как называется треугольник с равными сторонами?",
        1, 0, 0, 0,
        "Равносторонний",
        "Прямоугольный",
        "Разносторонний",
        "Остроугольный",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Сколько диагоналей у квадрата?",
        0, 1, 0, 0,
        "1",
        "2",
        "3",
        "4",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Чему равна площадь прямоугольника?",
        0, 0, 1, 0,
        "a+b",
        "2a+2b",
        "a*b",
        "a/b",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Как называется угол меньше 90 градусов?",
        0, 1, 0, 0,
        "Тупой",
        "Острый",
        "Прямой",
        "Развернутый",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Какие фигуры имеют четыре стороны?",
        1, 1, 0, 1,
        "Квадрат",
        "Прямоугольник",
        "Треугольник",
        "Ромб",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Какие углы равны 90 градусов?",
        1, 0, 1, 0,
        "Прямые",
        "Острые",
        "Перпендикулярные",
        "Тупые",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Какие фигуры являются параллелограммами?",
        1, 1, 0, 1,
        "Квадрат",
        "Прямоугольник",
        "Трапеция",
        "Ромб",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Какие элементы есть у круга?",
        1, 1, 1, 0,
        "Радиус",
        "Диаметр",
        "Центр",
        "Высота",
        1
    ]);

    await db.runAsync(QuestionsQueries.INSERT, [
        "Какие утверждения верны для равнобедренного треугольника?",
        1, 0, 1, 1,
        "Две стороны равны",
        "Все стороны разные",
        "Углы при основании равны",
        "Есть ось симметрии",
        1
    ]);
};