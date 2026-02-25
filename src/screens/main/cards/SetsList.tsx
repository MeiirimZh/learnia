import { useState } from "react";

import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import AppModal from "../../../../components/menus/AppModal";

import { useSQLiteContext } from "expo-sqlite";
import * as CategoriesQueries from "../../../database/queries/CategoriesQueries";
import useCategories from "../../../hooks/useCategories";

import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SetsStackParamList } from "../../../navigation/types";

type SetsNav = StackNavigationProp<SetsStackParamList, "SetsList">;
type RootNav = StackNavigationProp<RootStackParamList>;

type NavigationProp = CompositeNavigationProp<SetsNav, RootNav>;

type Props = {
    navigation: NavigationProp;
};

export default function SetsList({ navigation }: Props) {
    const db = useSQLiteContext();

    const { categories, loadCategories } = useCategories();

    const [ isSetModalVisible, setIsSetModalVisible ] = useState<boolean>(false);
    const [ isChoiceModalVisible, setIsChoiceModalVisible ] = useState<boolean>(false);
    const [ isCategoryModalVisible, setIsCategoryModalVisible ] = useState<boolean>(false);

    const [ selectedCategory, setSelectedCategory ] = useState<string>("Нет");

    const [ categoryName, setCategoryName ] = useState<string>("");
    const [ color, setColor ] = useState("#ababab");

    const createCategory = async () => {
        await db.runAsync(CategoriesQueries.INSERT, [
            categoryName,
            color
        ]);

        await loadCategories();
    };

    return (
        <View style={ styles.container }>
            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => setIsSetModalVisible(true)} />
            </FloatingActions>

            <AppModal visible={ isSetModalVisible } onPress={() => setIsSetModalVisible(false)} >
                <ScrollView contentContainerStyle={ styles.modal }>
                    <TextInput
                        style={ styles.textInput }
                        placeholder="Название" />
                    <TextInput
                        style={ styles.textInput } 
                        placeholder="Версия (необязательно)" />
                    <TouchableOpacity onPress={() => setIsChoiceModalVisible(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <AppText>Категория</AppText>
                            <Ionicons name="chevron-down-outline" size={ 16 } />
                        </View>
                        <AppText>{ selectedCategory }</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.createButton }>
                        <AppText style={{ color: theme.colors.onPrimary }}>Создать набор</AppText>
                    </TouchableOpacity>
                </ScrollView>
            </AppModal>

            <AppModal visible={ isChoiceModalVisible } onPress={() => setIsChoiceModalVisible(false)}>
                <View>
                    {categories.length > 0 ? (
                        <FlatList
                            data={ categories }
                            renderItem={({ item }) => (
                                <AppText>{ item.name }</AppText>
                            )}/>
                    ): (
                        <AppText>Пусто</AppText>
                    )}

                    <View style={{ alignSelf: 'flex-end' }}>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center',

                            width: 50,
                            height: 50,

                            borderRadius: 25,

                            backgroundColor: theme.colors.primary 
                        }}
                        onPress={() => setIsCategoryModalVisible(true)} >
                            <Ionicons name="add" color={ theme.colors.onPrimary } size={ 24 } />
                        </TouchableOpacity>
                    </View>
                </View>
            </AppModal>

            <AppModal visible={ isCategoryModalVisible } onPress={() => setIsCategoryModalVisible(false)}>
                <ScrollView contentContainerStyle={ styles.modal }>
                    <TextInput
                        style={ styles.textInput }
                        value={ categoryName }
                        onChangeText={ setCategoryName }
                        placeholder="Название" />

                    <View style={{ flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' }}>
                        <AppText>Цвет: </AppText>
                        <TouchableOpacity 
                            style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: color }}
                            onPress={() => navigation.navigate("ColorPick", {
                                initialColor: color,
                                onSelect: (selected) => setColor(selected)
                            })} />
                    </View>

                    <TouchableOpacity 
                        style={ styles.createButton }
                        onPress={() => {
                            createCategory();
                            setIsCategoryModalVisible(false);
                        }}>
                        <AppText style={{ color: theme.colors.onPrimary }}>Создать категорию</AppText>
                    </TouchableOpacity>
                </ScrollView>
            </AppModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    },

    modal: {
        gap: theme.spacing.md
    },

    textInput: {
        borderRadius: 10,
        backgroundColor: theme.colors.bgLight,
        padding: theme.spacing.md
    },

    createButton: {
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,

        backgroundColor: theme.colors.primary,

        padding: theme.spacing.md
    }
});