import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";

import { theme } from "../../src/theme";

type Props = {
    question: string,
    number: number,
    onPressMain: () => void
};

export default function QuestionItem({ question, number, onPressMain }: Props) {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.content } onPress={ onPressMain }>
                <View style={{ 
                    width: number > 99 ? '10%' : '7%', 
                    alignItems: 'center' 
                }}>
                    <AppText style={{ fontSize: 18, color: theme.colors.primary }}>{ number }</AppText>
                </View>
                <AppText numberOfLines={ 4 }>{ question }</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.sm
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});