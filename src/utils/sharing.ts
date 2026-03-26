import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

import { SQLiteDatabase } from "expo-sqlite";
import * as SetsQueries from "../database/queries/SetsQueries";
import * as CardsQueries from "../database/queries/CardsQueries";
import * as CategoriesQueries from "../database/queries/CategoriesQueries";
import * as TestsQueries from "../database/queries/TestsQueries";
import * as QuestionsQueries from "../database/queries/QuestionsQueries";

import { Note, Set, Card, Category, Test, Question } from "../../types";

export const shareJsonNotes = async (
  note: Note | undefined,
  fileName: string,
  dialogTitle: string
) => {
  try {
    const data = {
      type: "learnia",
      version: "1.0",
      note
    };

    const json = JSON.stringify(data, null, 2);

    const file = new File(Paths.cache, `${fileName}.json`);

    await file.write(json);

    if (!(await Sharing.isAvailableAsync())) {
      throw new Error("Невозможно поделиться материалом");
    }

    await Sharing.shareAsync(file.uri, {
      mimeType: "application/json",
      dialogTitle,
    });
  } catch (error) {
    console.error("Ошибка шаринга:", error);
  }
};

export const shareJsonCards = async (
  set: Set,
  cards: Card[],
  category: Category,
  fileName: string,
  dialogTitle: string
) => {
  try {
    const data = {
      type: "learnia",
      version: set.version,
      set,
      cards,
      category,
    };

    const json = JSON.stringify(data, null, 2);

    const file = new File(Paths.cache, `${fileName}.json`);

    await file.write(json);

    if (!(await Sharing.isAvailableAsync())) {
      throw new Error("Невозможно поделиться материалом");
    }

    await Sharing.shareAsync(file.uri, {
      mimeType: "application/json",
      dialogTitle,
    });

  } catch (error) {
    console.error("Ошибка шаринга:", error);
  }
};

export const shareJsonTests = async (
  test: Test,
  questions: Question[],
  category: Category,
  fileName: string,
  dialogTitle: string
) => {
  try {
    const data = {
      type: "learnia",
      version: test.version,
      test,
      questions,
      category,
    };

    const json = JSON.stringify(data, null, 2);

    const file = new File(Paths.cache, `${fileName}.json`);

    await file.write(json);

    if (!(await Sharing.isAvailableAsync())) {
      throw new Error("Невозможно поделиться материалом");
    }

    await Sharing.shareAsync(file.uri, {
      mimeType: "application/json",
      dialogTitle,
    });
  } catch (error) {
    console.error("Ошибка шаринга:", error);
  }
};

export const importJson = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    const file = new File(asset.uri);
    const content = await file.text();

    const data = JSON.parse(content);

    if (data.type !== "learnia") {
      throw new Error("Это не файл приложения");
    }

    return data;

  } catch (error) {
    console.error("Ошибка импорта:", error);
    return null;
  }
};

export const handleCardsImport = async (db: SQLiteDatabase, categories: Category[]) => {
  const data = await importJson();

  if (!data) return;

  if (data.set) {
    const category = categories.find(
      (category) => category.id === data.category.id
    );

    if (!category) {
      const result = await db.runAsync(CategoriesQueries.INSERT, [
        data.category.name,
        data.category.color
      ]);

      await db.runAsync(SetsQueries.INSERT, [
        data.set.title,
        data.set.creation_date,
        data.set.version,
        result.lastInsertRowId
      ]);
    } else {
      await db.runAsync(SetsQueries.INSERT, [
        data.set.title,
        data.set.creation_date,
        data.set.version,
        data.category.id
      ]);
    }

    data.cards.forEach(async (card: Card) => {
      await db.runAsync(CardsQueries.INSERT, [
        card.front,
        card.back,
        card.set_id
      ]);
    });
  }
};

export const handleTestsImport = async (db: SQLiteDatabase, categories: Category[]) => {
  const data = await importJson();

  if (!data) return;

  if (data.test) {
    const category = categories.find(
      (category) => category.id === data.category.id
    );

    if (!category) {
      const result = await db.runAsync(CategoriesQueries.INSERT, [
        data.category.name,
        data.category.color
      ]);

      await db.runAsync(TestsQueries.INSERT, [
        data.test.title,
        data.test.creation_date,
        data.test.version,
        result.lastInsertRowId
      ]);
    } else {
      await db.runAsync(TestsQueries.INSERT, [
        data.test.title,
        data.test.creation_date,
        data.test.version,
        data.category.id
      ]);
    }

    data.questions.forEach(async (question: Question) => {
      await db.runAsync(QuestionsQueries.INSERT, [
        question.question,
        question.is_answer_1_correct,
        question.is_answer_2_correct,
        question.is_answer_3_correct,
        question.is_answer_4_correct,
        question.answer_1, question.answer_2, question.answer_3, question.answer_4,
        question.test_id
      ]);
    });
  }
};