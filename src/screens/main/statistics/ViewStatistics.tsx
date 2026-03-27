import { StyleSheet, View } from "react-native";

import { theme } from "../../../theme";

export default function ViewStatistics() {
    return (
        <View style={ styles.container }>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});