import { createStackNavigator } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../navigation/types";

import TestsList from "./TestsList";
import ViewTest from "./ViewTest";
import ViewQuestion from "./ViewQuestion";
import TakeTest from "./practice/TakeTest";

import { theme } from "../../../theme";

const Stack = createStackNavigator<TestsStackParamList>();

export default function TestsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary
                    },
                    headerTintColor: theme.colors.onPrimary,
                    headerTitleStyle: {
                        color: theme.colors.onPrimary
                    }
            }}>
            <Stack.Screen name="TestsList" component={ TestsList } options={{ title: 'Тесты' }} />
            <Stack.Screen name="ViewTest" component={ ViewTest } />
            <Stack.Screen name="ViewQuestion" component={ ViewQuestion } />
            <Stack.Screen name="TakeTest" component={ TakeTest } />
        </Stack.Navigator>
    )
}