import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

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