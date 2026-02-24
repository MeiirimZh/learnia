import { createStackNavigator } from "@react-navigation/stack";

import { SetsStackParamList } from "../../../navigation/types";

import SetsList from "./SetsList";
import ViewSet from "./ViewSet";

import { theme } from "../../../theme";

const Stack = createStackNavigator<SetsStackParamList>();

export default function SetsStack() {
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
            <Stack.Screen name="SetsList" component={ SetsList } options={{ title: 'Карточки' }} />
            <Stack.Screen name="ViewSet" component={ ViewSet } />
        </Stack.Navigator>
    )
}