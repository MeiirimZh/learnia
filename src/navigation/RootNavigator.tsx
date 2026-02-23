import { useState } from "react";

import { SQLiteProvider } from "expo-sqlite";
import DatabaseInitializer from "../database/DatabaseInitializer";

import MainTabs from "./MainTabs";

export default function RootNavigator() {
    const [ ready, setReady ] = useState<boolean>(false);

    if (!ready) {
        return (
            <DatabaseInitializer onReady={() => setReady(true)} />
        )
    }

    return (
        <SQLiteProvider
            databaseName="local.db"
            options={{ useNewConnection: false }}>
                <MainTabs />
        </SQLiteProvider>
    )
}