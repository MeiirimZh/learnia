import Constants from "expo-constants";

import { SQLiteProvider } from "expo-sqlite"

import { View, ActivityIndicator } from "react-native";
import AppText from "../../components/AppText";
import { theme } from "../theme";

import * as CategoriesQueries from "./queries/CategoriesQueries";
import * as NotesQueries from "./queries/NotesQueries";
import * as SetsQueries from "./queries/SetsQueries";
import * as CardsQueries from "./queries/CardsQueries";
import * as TestsQueries from "./queries/TestsQueries";
import * as QuestionsQueries from "./queries/QuestionsQueries";
import * as StudiedCards from "./queries/StudiedCardsQueries";
import * as CompletedTests from "./queries/CompletedTestsQueries";
import { seedDatabase } from "./seed/Seed";

type Props = {
    onReady: () => void;
}

const variant = Constants.expoConfig?.extra?.APP_VARIANT;

export default function DatabaseInitializer({ onReady }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.sm }}>
            <ActivityIndicator size="large" color={ theme.colors.primary } />
            <AppText style={{ color: theme.colors.textMuted }}>
                Загрузка базы данных...
            </AppText>

            <SQLiteProvider
            databaseName="local.db"
            onInit={async (db) => {
                const result = await db.getFirstAsync<{ user_version: number }>(
                    "PRAGMA user_version"
                );

                const version = result?.user_version ?? 0;

                await db.execAsync(CategoriesQueries.CREATE_TABLE);

                await db.execAsync(NotesQueries.CREATE_TABLE);

                await db.execAsync(SetsQueries.CREATE_TABLE);

                await db.execAsync(CardsQueries.CREATE_TABLE);

                await db.execAsync(TestsQueries.CREATE_TABLE);

                await db.execAsync(QuestionsQueries.CREATE_TABLE);

                await db.execAsync(StudiedCards.CREATE_TABLE);

                await db.execAsync(CompletedTests.CREATE_TABLE);

                if (version === 0) {
                    await db.runAsync(
                        "INSERT OR IGNORE INTO categories (name, color) VALUES (?, ?)",
                        ["Нет", "#ababab"]
                    );
                
                    if (variant === "demo") {
                        await seedDatabase(db);
                    }

                    await db.execAsync("PRAGMA user_version = 1");
                }

                onReady();
            }}>
                <></>
            </SQLiteProvider>
        </View>
    )
}