import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../src/theme";

type Props = React.PropsWithChildren<{
    onPress: () => void;
    colors: [string, string, ...string[]];
    width: number;
    height: number;
}>;

export default function GradientBorderButton({ onPress, children, colors, width, height }: Props) {
    return (
        <LinearGradient colors={ colors } style={ [{width, height}, styles.gradient] }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} >
            <TouchableOpacity onPress={ onPress }
                style={ [{width: width - 6, height: height - 6, borderRadius: width / 2}, styles.button] }>
                { children }
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 999,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: theme.colors.bgLight,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});