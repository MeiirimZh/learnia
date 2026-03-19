import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";

import { theme } from "../../src/theme";

type Props = {
    text: string,
    onPress: () => void,
    onLongPress: () => void
};

export default function TextButton({ text, onPress, onLongPress }: Props) {
    return (
        <TouchableOpacity
            style={ styles.container }
            onPress={ onPress }
            onLongPress={ onLongPress }>
            <AppText style={ styles.text }>
                { text }
            </AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md
    },
    text: {
        color: theme.colors.onPrimary
    }
});