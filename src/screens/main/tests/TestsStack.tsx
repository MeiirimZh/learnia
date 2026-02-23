import { createStackNavigator } from "@react-navigation/stack";

import TestsList from "./TestsList";
import ViewTest from "./ViewTest";

const Stack = createStackNavigator();

export default function TestsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TestsList" component={ TestsList } options={{ title: 'Тесты', headerShown: false }} />
            <Stack.Screen name="ViewTest" component={ ViewTest } />
        </Stack.Navigator>
    )
}