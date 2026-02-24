import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SQLiteProvider } from "expo-sqlite";
import DatabaseInitializer from "../database/DatabaseInitializer";

import MainTabs from "./MainTabs";
import ColorPick from "../screens/main/others/ColorPick";

import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

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
                <Stack.Navigator>
                    <Stack.Screen
                        name="MainTabs"
                        component={ MainTabs }
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="ColorPick"
                        component={ ColorPick }
                        options={{ title: 'Выбор цвета' }} />
                </Stack.Navigator>
        </SQLiteProvider>
    )
}