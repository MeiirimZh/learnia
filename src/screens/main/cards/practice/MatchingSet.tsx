import { useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../../navigation/types";

import { StyleSheet, View } from "react-native";

import { theme } from "../../../../theme";

type Props = StackScreenProps<SetsStackParamList, "MatchingSet">;

export default function MatchingSet({ navigation, route }: Props) {
    const set = route.params.set;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set?.title
        });
    }, []);

    return (
        <View style={ styles.container }>

        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});