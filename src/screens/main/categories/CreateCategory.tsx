import { useState, useLayoutEffect } from "react";

import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import AppText from "../../../../components/AppText";

import { useSQLiteContext } from "expo-sqlite";
import * as CategoriesQueries from "../../../database/queries/CategoriesQueries";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<RootStackParamList, "CreateCategory">;

export default function CreateCategory({ route, navigation }: Props) {
    const db = useSQLiteContext();

    const [ name, setName ] = useState<string>("");
    const [ color, setColor ] = useState<string>("#ababab");

    const addCategory = async () => {
        await db.runAsync(CategoriesQueries.INSERT, [
            name,
            color
        ]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={async () => {
                        await addCategory();
                        navigation.goBack();
                    }}>
                    <Ionicons name="checkmark" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            )
        });
    }, [name, color]);

    return (
        <View style={ styles.container }>
            <TextInput
                style={ styles.textInput }
                value={ name }
                onChangeText={ setName }
                placeholder="Название" />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.md
            }}>
                <AppText>Цвет: </AppText>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,

                        borderRadius: 10,

                        backgroundColor: color
                    }}
                    onPress={() => navigation.navigate("ColorPick", {
                        initialColor: color, 
                        onSelect: (color) => setColor(color)
                    })} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.md,

        padding: theme.spacing.md
    },

    textInput: {
        width: '100%',

        fontSize: 16,

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});