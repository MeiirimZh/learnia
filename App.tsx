import { SQLiteProvider } from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import NotesScreen from "./screens/NotesScreen";
import CardsScreen from "./screens/CardsScreen";
import TestsScreen from "./screens/TestsScreen";

import { theme } from './src/theme/index';
import { useFonts } from "expo-font";

import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto Regular': require('./assets/fonts/Roboto Regular.ttf'),
        'Roboto Bold': require('./assets/fonts/Roboto Bold.ttf')
    });

    if (!fontsLoaded) return null;

    return (
        <SQLiteProvider 
        databaseName="local.db"
        options={{ useNewConnection: false }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                        const iconMap = {
                          Notes: focused ? 'document' : 'document-outline',
                          Cards: focused ? 'albums' : 'albums-outline',
                          Tests: focused ? 'clipboard' : 'clipboard-outline'
                        } as const;

                        const iconName = iconMap[route.name as keyof typeof iconMap];

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.textMuted,
                    tabBarStyle: {height: 100},
                
                    headerStyle: {backgroundColor: theme.colors.primary},
                    headerTitleStyle: {color: theme.colors.onPrimary},

                    headerLeft: () => (
                      <TouchableOpacity style={ {marginRight: 10} } >
                        <Ionicons name="menu" size={ 24 } color={ theme.colors.onPrimary } />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {
                      paddingLeft: 10
                    }
                    })}>
                    <Tab.Screen name="Notes" component={ NotesScreen } options={ {title: 'Заметки'} } />
                    <Tab.Screen name="Cards" component={ CardsScreen } options={ {title: 'Карточки'} } />
                    <Tab.Screen name="Tests" component={ TestsScreen } options={ {title: 'Тесты'} } />
                </Tab.Navigator>
            </NavigationContainer>
        </SQLiteProvider>
    );
}