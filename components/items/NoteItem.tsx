import { useWindowDimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    content: String;
    title: String;
    date: String;
    showDeleteMarker: boolean;
    deleteSelected: boolean;
    onPress: () => void;
    onLongPress: () => void;
    onDeletePress: () => void;
};

export default function NoteItem({ 
    content, 
    title, 
    date, 
    showDeleteMarker, 
    deleteSelected, 
    onPress, 
    onLongPress,
    onDeletePress
 }: Props) {
    const { width } = useWindowDimensions();

    return (
        <View style={ {width: (width - 3 * theme.spacing.md) / 2, padding: theme.spacing.sm} }>
            <View style={ {gap: theme.spacing.md } } >
                <TouchableOpacity style={ styles.content } onPress={ onPress } onLongPress={ onLongPress } >
                    <AppText style= { styles.text } >{ content }</AppText>
                </TouchableOpacity>

                <View style={ styles.desc }>
                    <View>
                        <AppText numberOfLines={ 2 } style={ [styles.text, styles.titleText] }>{ title }</AppText>
                    </View>

                    <View>
                        <AppText numberOfLines={ 1 } style={ [styles.text, styles.dateText] }>{ date }</AppText>
                    </View>
                </View>
                
                {
                    showDeleteMarker && 
                        <TouchableOpacity 
                            style={{ 
                            position: 'absolute', 
                            top: 5, 
                            left: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 30,
                            height: 30 }}
                            onPress={ onDeletePress }>
                            <Ionicons 
                                name={ deleteSelected ? "checkmark-circle" : "ellipse-outline" }
                                size={ 24 }
                                color={ deleteSelected ? theme.colors.danger : theme.colors.text } />
                        </TouchableOpacity>
                    
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        padding: theme.spacing.md,

        height: 220
    },
    desc: {
        height: 56
    },
    text: {
        fontSize: 14,

        color: theme.colors.text
    },
    titleText: {
        textAlign: 'center',

        fontFamily: theme.fonts.bold,

        color: theme.colors.text
    },
    dateText: {
        textAlign: 'center',

        color: theme.colors.textMuted
    }
});