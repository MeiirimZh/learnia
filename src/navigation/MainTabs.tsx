import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotesStack from "../screens/main/notes/NotesStack";
import SetsStack from "../screens/main/cards/SetsStack";
import TestsStack from "../screens/main/tests/TestsStack";
import ViewStatistics from "../screens/main/statistics/ViewStatistics";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            	const icons = {
            		NotesStack: focused ? 'document' : 'document-outline',
            		SetsStack: focused ? 'albums' : 'albums-outline',
            		TestsStack: focused ? 'clipboard' : 'clipboard-outline',
            		ViewStatistics: focused ? 'bar-chart' : 'bar-chart-outline'
              	} as const;

				return (
                	<Ionicons
					name={icons[route.name as keyof typeof icons]}
                	  size={size}
                	  color={color}
                	/>
              	);
        	},
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textMuted,
            tabBarStyle: { height: 100 },

            headerStyle: {
            	height: 100
            }
        	})}>
            <Tab.Screen name="NotesStack" component={ NotesStack } options={{ title: 'Заметки', headerShown: false }} />
            <Tab.Screen name="SetsStack" component={ SetsStack } options={{ title: 'Карточки', headerShown: false }} />
            <Tab.Screen name="TestsStack" component={ TestsStack } options={{ title: 'Тесты', headerShown: false }} />
            <Tab.Screen name="ViewStatistics" component={ ViewStatistics } options={{ 
				title: 'Статистика',
				headerStyle: {
              		backgroundColor: theme.colors.primary
              	},
              	headerTitleStyle: {
            		color: theme.colors.onPrimary
              	}
			}}/>
        </Tab.Navigator>
    )
}