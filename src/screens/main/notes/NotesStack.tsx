import { createStackNavigator } from "@react-navigation/stack";

import { NotesStackParamList } from "../../../navigation/types";

import NotesList from "./NotesList";
import ViewNote from "./ViewNote";

import { theme } from "../../../theme";

const Stack = createStackNavigator<NotesStackParamList>();

export default function NotesStack() {
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
            <Stack.Screen name="NotesList" component={ NotesList } options={{ title: 'Заметки' }} />
            <Stack.Screen name="ViewNote" component={ ViewNote } />
        </Stack.Navigator>
    )
}