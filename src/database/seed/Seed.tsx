import { SQLiteDatabase } from "expo-sqlite";
import { seedCategories } from "./SeedCategories";
import { seedSets } from "./SeedSets";
import { seedCards } from "./SeedCards";
import { seedTests } from "./SeedTests";
import { seedQuestions } from "./SeedQuestions.";
import { seedStudiedCards } from "./SeedStudiedCards";
import { seedCompletedTests } from "./SeedCompletedTests";

export const seedDatabase = async (db: SQLiteDatabase) => {
    await seedCategories(db);
    await seedSets(db);
    await seedCards(db);
    await seedTests(db);
    await seedQuestions(db);
    await seedStudiedCards(db);
    await seedCompletedTests(db);
};