import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    question: string;
    number: number;
    showDeleteMarker: boolean;
    deleteSelected: boolean;
    onPress: () => void;
    onLongPress: () => void;
};

export default function QuestionItem({ question, number, showDeleteMarker, deleteSelected, onPress, onLongPress }: Props) {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.content } onPress={ onPress } onLongPress={ onLongPress }>
                <View style={{ 
                    width: number > 99 ? '10%' : '7%', 
                    alignItems: 'center' 
                }}>
                    <AppText style={{ fontSize: 18, color: theme.colors.secondary }}>{ number }</AppText>
                </View>
                <AppText style={{ width: '80%' }} numberOfLines={ 4 }>
                    { question }
                </AppText>
                { showDeleteMarker &&
                <Ionicons
                    style={{ position: 'absolute', right: theme.spacing.md }}
                    name={ deleteSelected ? "checkmark-circle" : "ellipse-outline" }
                    size={ 24 }
                    color={ deleteSelected ? theme.colors.danger : theme.colors.text } />
                }
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