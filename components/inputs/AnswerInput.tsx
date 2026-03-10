import { useState, Dispatch, SetStateAction } from "react";

import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../src/theme";

type Props = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    onSelect: () => void,
    selected: boolean,
    placeholder: string
};

const VERTICAL_PADDING = theme.spacing.md * 2;
const MAX_LINES = 4;
const LINE_HEIGHT = 22;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT + VERTICAL_PADDING;

export default function AnswerInput({ value, setValue, onSelect, selected, placeholder }: Props) {
    const [ height, setHeight ] = useState<number>(LINE_HEIGHT);

    return (
        <View style={ styles.container }>
            <TouchableOpacity 
                onPress={ onSelect }
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                    height: 30
            }}>
                {
                    <Ionicons
                        name={ selected ? "checkmark-circle" : "ellipse-outline" }
                        size={ 24 }
                        color={ selected ? theme.colors.success : theme.colors.text } />
                }
            </TouchableOpacity>

            <TextInput
                multiline
                scrollEnabled={ height >= MAX_HEIGHT }
                onContentSizeChange={(e) => {
                    const contentHeight = e.nativeEvent.contentSize.height;
                    setHeight(Math.min(contentHeight, MAX_HEIGHT));
                }}
                textAlignVertical="top"
                style={ [styles.textInput, { height: height }] }
                value={ value }
                onChangeText={ setValue }
                placeholder={ placeholder } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,

        padding: theme.spacing.sm
    },

    textInput: {
        flex: 1,

        lineHeight: LINE_HEIGHT,
        
        fontSize: 16,

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