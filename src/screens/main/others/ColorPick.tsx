import { useState, useLayoutEffect } from "react";

import { View, TouchableOpacity } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";

import ColorPicker from "react-native-wheel-color-picker";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<RootStackParamList, "ColorPick">;

export default function ColorPick({ route, navigation }: Props) {
    const { initialColor, onSelect } = route.params;
    const [ color, setColor ] = useState(initialColor);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        onSelect(color);
                        navigation.goBack();
                    }}>
                    <Ionicons name="checkmark" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            ),
            headerRightContainerStyle: {
                paddingRight: theme.spacing.md
            }
        });
    }, [color]);

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: theme.spacing.md }}>
            <View style={{ width: '80%' }}>
                <ColorPicker 
                    color={ color }
                    onColorChange={ setColor }
                    thumbSize={ 30 }
                    sliderSize={ 40 }
                    noSnap={ true }
                    row={ false } />
            </View>
        </View>
    )
}