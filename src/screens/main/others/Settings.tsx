import { StyleSheet, View, ScrollView } from "react-native";
import AppText from "../../../../components/AppText";

import { theme } from "../../../theme";

export default function Settings() {
    return (
        <ScrollView style={ styles.container }>
            <AppText style={ styles.header }>Карточки</AppText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    },
    header: {
        fontSize: 20,
        color: theme.colors.text
    }
});