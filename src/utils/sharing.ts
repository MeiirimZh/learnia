import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { Set, Card, Category } from "../../types";

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
      throw new Error("Шаринг недоступен");
    }

    await Sharing.shareAsync(file.uri, {
      mimeType: "application/json",
      dialogTitle,
    });

  } catch (error) {
    console.error("Ошибка шаринга:", error);
  }
};