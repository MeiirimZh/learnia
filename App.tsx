import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";

import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto Regular': require('./assets/fonts/Roboto Regular.ttf'),
        'Roboto Bold': require('./assets/fonts/Roboto Bold.ttf')
    });

    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}