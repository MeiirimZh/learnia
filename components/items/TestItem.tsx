import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    title: string;
    color: string;
    totalQuestionsCount: number;
    lastResult: number;
    onPressMain: () => void;
    onPressStart: () => void;
    onOptionsPress: () => void;
    onPressShare: () => void;
};

export default function TestItem({
    title,
    color,
    totalQuestionsCount,
    lastResult,
    onPressMain,
    onPressStart,
    onOptionsPress,
    onPressShare
}: Props) {
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.content } onPress={ onPressMain }>
                <View style={ [ styles.colorMarker, { backgroundColor: color } ] } />
                <View style={ styles.main }>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%' }}>
                            <AppText
                                style={{ fontFamily: theme.fonts.bold }}
                                numberOfLines={ 2 } >
                                    { title }
                            </AppText>
                        </View>
                
                        <TouchableOpacity style={ styles.sideButton } onPress={ onOptionsPress }>
                            <Ionicons name="ellipsis-vertical" size={ 24 } />
                        </TouchableOpacity>
                    </View>
                    <AppText 
                        style={{ color: theme.colors.textMuted, marginBottom: theme.spacing.md }}
                        numberOfLines={ 1 }>
                        { `Количество вопросов: ${ totalQuestionsCount }` }
                    </AppText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                            <TouchableOpacity 
                                style={ styles.studyButton }
                                onPress={ onPressStart }>
                                <AppText style={{ fontSize: 12, color: theme.colors.primary }}>НАЧАТЬ</AppText>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={ styles.sideButton } onPress={ onPressShare }>
                            <Ionicons name="share-social" size={ 24 } />
                        </TouchableOpacity>
                    </View>
                    </View>
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

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight,
    },
    main: {
        flex: 1,

        padding: theme.spacing.md
    },

    colorMarker: {
        width: 10,

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

        height: '100%'
    },
    sideButton: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30
    },
    studyButton: {
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.primary,
        borderRadius: 15,

        color: theme.colors.primary,

        paddingHorizontal: theme.spacing.md,

        height: 30
    }
});