import { StyleSheet, View } from "react-native";
import AppText from "../AppText";
import TextButton from "../buttons/TextButton";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    correctAnswersCount: number;
    wrongAnswersCount: number;
    onReturn: () => void;
};

export default function StudyResult({ correctAnswersCount, wrongAnswersCount, onReturn }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.lg, padding: theme.spacing.lg }}>
            <Ionicons name="star" color={ theme.colors.secondary } size={ 50 } />
            <AppText style={{ fontFamily: theme.fonts.semibold, fontSize: 20 }}>Просмотр завершен!</AppText>
            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <View style={ styles.result }>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Ionicons name="checkmark-circle-outline" color={ theme.colors.success } size={ 24 } />
                        <AppText>{ correctAnswersCount }</AppText>
                    </View>
                    <AppText>Правильные ответы</AppText>
                </View>
                <View style={ styles.result }>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Ionicons name="close-circle-outline" color={ theme.colors.danger } size={ 24 } />
                        <AppText>{ wrongAnswersCount }</AppText>
                    </View>
                    <AppText>Неправильные ответы</AppText>
                </View>
            </View>
            <TextButton text="Вернуться" onPress={ onReturn } onLongPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
    result: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});