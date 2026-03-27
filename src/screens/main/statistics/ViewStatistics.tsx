import useStudiedCards from "../../../hooks/useStudiedCards";

import { StyleSheet, View, FlatList } from "react-native";
import AppText from "../../../../components/AppText";

import { theme } from "../../../theme";

export default function ViewStatistics() {
    const { studiedCards } = useStudiedCards();

    return (
        <View style={ styles.container }>
            <FlatList
                data={ studiedCards }
                renderItem={({ item }) => (
                    <AppText>{item.id} {item.card_id} {item.studied_at}</AppText>
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});