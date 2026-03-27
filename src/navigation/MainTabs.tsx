import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotesStack from "../screens/main/notes/NotesStack";
import SetsStack from "../screens/main/cards/SetsStack";
import TestsStack from "../screens/main/tests/TestsStack";
import ViewStatistics from "../screens/main/statistics/ViewStatistics";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

const Tab = createBottomTabNavigator();
const baseTabBarStyle = { height: 100 };

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
            <Tab.Screen 
				name="NotesStack"
				component={ NotesStack }
				options={({ route }) => {
					const routeName = getFocusedRouteNameFromRoute(route) ?? "NotesList";

					const hideTabBarScreens = ["ViewNote", "GenerateNote"];

					return {
						title: 'Заметки', 
						headerShown: false,
						tabBarStyle: hideTabBarScreens.includes(routeName)
							? { display: 'none' }
							: { baseTabBarStyle }
					};
				}} 
			/>
            <Tab.Screen
				name="SetsStack"
				component={ SetsStack }
				options={({ route }) => {
					const routeName = getFocusedRouteNameFromRoute(route) ?? "SetsList";

					const hideTabBarScreens = ["ViewSet", "ViewCard", "ReviewSet", "SelectDefinitionSet", "MatchingSet"];
					
					return {
						title: 'Карточки', 
						headerShown: false,
						tabBarStyle: hideTabBarScreens.includes(routeName)
							? { display: 'none' }
							: { baseTabBarStyle }
					};
				}}
			/>
            <Tab.Screen
				name="TestsStack"
				component={ TestsStack }
				options={({ route }) => {
					const routeName = getFocusedRouteNameFromRoute(route) ?? "TestsList";

					const hideTabBarScreens = ["ViewTest", "ViewQuestion", "TakeTest"];

					return {
						title: 'Тесты', 
						headerShown: false,
						tabBarStyle: hideTabBarScreens.includes(routeName)
							? { display: 'none' }
							: { baseTabBarStyle }
					};
				}} 
			/>
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