import { useState } from "react";

import { StyleSheet, View, ScrollView } from "react-native";
import AppText from "../../../../components/AppText";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../theme";

const cardsDisplayModeData = [
    { label: 'Показывать переднюю часть', value: '1' },
    { label: 'Показывать заднюю часть', value: '2' },
    { label: 'Показывать случайнюю часть', value: '3' },
];

export default function Settings() {
    const [ value, setValue ] = useState<string | null>(null);

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.option }>
                <AppText style={ styles.header }>Карточки</AppText>
                <AppText>Режим отображения карточек:</AppText>
                <View style={{ padding: theme.spacing.sm }}>
                    <Dropdown
                        style={ styles.dropdown }
                        data={ cardsDisplayModeData }
                        labelField="label"
                        valueField="value"
                        value={ value }
                        placeholder="Выберите режим"
                        onChange={item => {
                            setValue(item.value)
                        }} />
                    </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    },
    option: {
        gap: theme.spacing.sm
    },
    header: {
        fontSize: 20,
        color: theme.colors.text
    },
    dropdown: {
        height: 50,

        borderRadius: 10,
        
        backgroundColor: theme.colors.bgLight,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        paddingHorizontal: theme.spacing.md
    }
});