import { StyleSheet, View } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    msg: string
};

export default function EmptyPage({ msg }: Props) {
    return (
        <View style={ styles.container }>
            <Ionicons name="file-tray" size={ 80 } color={ theme.colors.border } />
            <AppText style={{ fontSize: 20, color: theme.colors.border }}>Здесь пока пусто</AppText>
            <AppText style={{ color: theme.colors.border }}>{ msg }</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});