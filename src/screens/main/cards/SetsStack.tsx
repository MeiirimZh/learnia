import { createStackNavigator } from "@react-navigation/stack";

import { SetsStackParamList } from "../../../navigation/types";

import SetsList from "./SetsList";
import ViewSet from "./ViewSet";
import ViewCard from "./ViewCard";
import ReviewSet from "./practice/ReviewSet";
import SelectDefinitionSet from "./practice/SelectDefinitionSet";
import MatchingSet from "./practice/MatchingSet";

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
            <Stack.Screen name="ViewCard" component={ ViewCard } />
            <Stack.Screen name="ReviewSet" component={ ReviewSet } />
            <Stack.Screen name="SelectDefinitionSet" component={ SelectDefinitionSet } />
            <Stack.Screen name="MatchingSet" component={ MatchingSet } />
        </Stack.Navigator>
    )
}