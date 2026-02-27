import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";

import { theme } from "../../src/theme";

type Props = {
    front: string,
    back: string
};

export default function CardItem({ front, back }: Props) {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.content }>
                <AppText style={{ fontFamily: theme.fonts.bold }}>{ front }</AppText>
                <AppText>{ back }</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: theme.spacing.sm
    },
    content: {
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,
        
        padding: theme.spacing.md
    }
});