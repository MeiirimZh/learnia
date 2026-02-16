import { SQLiteProvider } from "expo-sqlite"

import { View, ActivityIndicator } from "react-native";
import AppText from "../../components/AppText";
import { theme } from "../theme";

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
                onReady();
            }}>
                <></>
            </SQLiteProvider>
        </View>
    )
}