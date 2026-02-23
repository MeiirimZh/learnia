import { StyleSheet, View, Text } from "react-native";

import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';

import { theme } from "../../../theme";

export default function SetsList() {
    return (
        <View style={ styles.container }>
            <Text>Список наборов карточек</Text>

            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => {}} />
            </FloatingActions>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});