import { useWindowDimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    front: string,
    back: string, 
    onPress: () => void
};

export default function CardItem({ front, back, onPress }: Props) {
    const { width } = useWindowDimensions();

    return (
        <View style={{
            width: (width - 3 * theme.spacing.md) / 2,
            padding: theme.spacing.sm }}>
            <TouchableOpacity style={ styles.content } onPress={ onPress }>
                <AppText style={{ fontFamily: theme.fonts.bold }}>{ front }</AppText>
                <AppText>{ back }</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        minHeight: 80,
        
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,
        
        padding: theme.spacing.md
    }
});