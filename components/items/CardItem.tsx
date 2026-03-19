import { useWindowDimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    front: string,
    back: string,
    showDeleteMarker: boolean,
    deleteSelected: boolean,
    onPress: () => void,
    onLongPress: () => void
};

export default function CardItem({ front, back, showDeleteMarker, deleteSelected, onPress, onLongPress }: Props) {
    const { width } = useWindowDimensions();

    return (
        <View style={{
            width: (width - 3 * theme.spacing.md) / 2,
            padding: theme.spacing.sm }}>
            <TouchableOpacity style={ styles.content } onPress={ onPress } onLongPress={ onLongPress }>
                <AppText style={{ fontFamily: theme.fonts.bold }}>{ front }</AppText>
                <AppText>{ back }</AppText>

                {
                    showDeleteMarker &&
                    <Ionicons
                        style={{ position: 'absolute', top: 5, left: 5 }}
                        name={ deleteSelected ? "checkmark-circle" : "ellipse-outline" }
                        size={ 24 }
                        color={ deleteSelected ? theme.colors.danger : theme.colors.text }
                        />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        minHeight: 80,
        
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        
        padding: theme.spacing.md
    }
});