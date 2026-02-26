import { useState, useLayoutEffect } from "react";

import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import AppText from "../../../../components/AppText";

import { useSQLiteContext } from "expo-sqlite";
import * as CategoriesQueries from "../../../database/queries/CategoriesQueries";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<RootStackParamList, "ViewCategory">;

export default function ViewCategory({ route, navigation }: Props) {
    const category = route.params?.category;
    const onGoBack = route.params?.onGoBack;

    const db = useSQLiteContext();

    const [ id, setId ] = useState<number | null>(category?.id ?? null);
    const [ name, setName ] = useState<string>(category?.name ?? "");
    const [ color, setColor ] = useState<string>(category?.color ?? "#ababab");

    const addCategory = async () => {
        await db.runAsync(CategoriesQueries.INSERT, [
            name,
            color
        ]);
    };

    const updateCategory = async () => {
        await db.runAsync(CategoriesQueries.UPDATE, [
            name,
            color,
            id
        ]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: id ? "Изменение категории" : "Создание категории",
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={async () => {
                        if (id) {
                            await updateCategory();
                        }
                        else {
                            await addCategory();
                        }
                        onGoBack?.();
                        navigation.goBack();
                    }}>
                    <Ionicons name="checkmark" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            )
        });
    }, [name, color, id]);

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

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});