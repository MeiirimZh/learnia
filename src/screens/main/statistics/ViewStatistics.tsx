import useStudiedCards from "../../../hooks/useStudiedCards";
import useCompletedTests from "../../../hooks/useCompletedTests";

import { StyleSheet, View, FlatList } from "react-native";
import AppText from "../../../../components/AppText";

import { theme } from "../../../theme";

export default function ViewStatistics() {
    const { studiedCards } = useStudiedCards();
    const { completedTests } = useCompletedTests();

    return (
        <View style={ styles.container }>
            <FlatList
                data={ studiedCards }
                renderItem={({ item }) => (
                    <AppText>{item.id} {item.card_id} {item.studied_at} { item.is_correct ? "Правильно" : "Неправильно" }</AppText>
                )} />
            <FlatList
                data={ completedTests }
                renderItem={({ item }) => (
                    <AppText>{ item.id } { item.test_id } { item.completed_at } { item.score }</AppText>
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