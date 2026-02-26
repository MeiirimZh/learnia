import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";

import { theme } from "../../src/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    name: string,
    color: string,
    onPress: () => void,
    onSideButtonPress: () => void
};

export default function CategoryItem({ name, color, onPress, onSideButtonPress }: Props) {
    return (
        <TouchableOpacity 
            style={ styles.container }
            onPress={ onPress }>
            <View style={ [styles.colorMarker, { backgroundColor: color }] } />
            <View style={ styles.content }>
                <AppText style={{ fontSize: 16 }} numberOfLines={ 1 }>{ name }</AppText>
                <TouchableOpacity 
                    style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50 }}
                    onPress={ onSideButtonPress }>
                    <Ionicons name="ellipsis-vertical" size={ 24 } />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        width: '100%',

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        backgroundColor: theme.colors.bgLight
    },
    colorMarker: {
        width: 10,
        height: '100%',

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: '100%',

        padding: theme.spacing.sm
    }
});