import { SQLiteProvider } from "expo-sqlite"

import { View, ActivityIndicator } from "react-native";
import AppText from "../../components/AppText";
import { theme } from "../theme";

import * as TagsQueries from "./queries/TagsQueries";
import * as CategoriesQueries from "./queries/CategoriesQueries";
import * as NotesQueries from "./queries/NotesQueries";
import * as NotesTagsQueries from "./queries/NotesTagsQueries";
import * as SetsQueries from "./queries/SetsQueries";
import * as CardsQueries from "./queries/CardsQueries";
import * as TestsQueries from "./queries/TestsQueries";
import * as QuestionsQueries from "./queries/QuestionsQueries";
import * as RepetitionsQueries from "./queries/RepetitionsQueries";
import * as CardsRepetitionsQueries from "./queries/CardsRepetitions";
import * as TestsRepetitionsQueries from "./queries/TestsRepetitions";

type Props = {
    onReady: () => void;
}

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
                await db.execAsync(TagsQueries.DROP_TABLE);
                await db.execAsync(TagsQueries.CREATE_TABLE);

                await db.execAsync(CategoriesQueries.DROP_TABLE);
                await db.execAsync(CategoriesQueries.CREATE_TABLE);

                await db.execAsync(NotesQueries.DROP_TABLE);
                await db.execAsync(NotesQueries.CREATE_TABLE);

                await db.execAsync(NotesTagsQueries.DROP_TABLE);
                await db.execAsync(NotesTagsQueries.CREATE_TABLE);

                await db.execAsync(SetsQueries.DROP_TABLE);
                await db.execAsync(SetsQueries.CREATE_TABLE);

                await db.execAsync(CardsQueries.DROP_TABLE);
                await db.execAsync(CardsQueries.CREATE_TABLE);

                await db.execAsync(TestsQueries.DROP_TABLE);
                await db.execAsync(TestsQueries.CREATE_TABLE);

                await db.execAsync(QuestionsQueries.DROP_TABLE);
                await db.execAsync(QuestionsQueries.CREATE_TABLE);

                await db.execAsync(RepetitionsQueries.DROP_TABLE);
                await db.execAsync(RepetitionsQueries.CREATE_TABLE);

                await db.execAsync(CardsRepetitionsQueries.DROP_TABLE);
                await db.execAsync(CardsRepetitionsQueries.CREATE_TABLE);

                await db.execAsync(TestsRepetitionsQueries.DROP_TABLE);
                await db.execAsync(TestsRepetitionsQueries.CREATE_TABLE);

                onReady();
            }}>
                <></>
            </SQLiteProvider>
        </View>
    )
}