import { createStackNavigator } from "@react-navigation/stack";

import SetsList from "./SetsList";
import ViewSet from "./ViewSet";

const Stack = createStackNavigator();

export default function SetsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="NotesList" component={ SetsList } options={{ title: 'Карточки', headerShown: false }} />
            <Stack.Screen name="ViewNote" component={ ViewSet } />
        </Stack.Navigator>
    )
}