import { createStackNavigator } from "@react-navigation/stack";

import TestsList from "./TestsList";
import ViewTest from "./ViewTest";

import { theme } from "../../../theme";

const Stack = createStackNavigator();

export default function TestsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary
                    },
                    headerTitleStyle: {
                        color: theme.colors.onPrimary
                    }
            }}>
            <Stack.Screen name="TestsList" component={ TestsList } options={{ title: 'Тесты' }} />
            <Stack.Screen name="ViewTest" component={ ViewTest } />
        </Stack.Navigator>
    )
}