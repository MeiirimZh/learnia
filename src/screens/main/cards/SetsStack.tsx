import { createStackNavigator } from "@react-navigation/stack";

import SetsList from "./SetsList";
import ViewSet from "./ViewSet";

import { theme } from "../../../theme";

const Stack = createStackNavigator();

export default function SetsStack() {
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
            <Stack.Screen name="NotesList" component={ SetsList } options={{ title: 'Карточки' }} />
            <Stack.Screen name="ViewNote" component={ ViewSet } />
        </Stack.Navigator>
    )
}