import { useState, useMemo } from "react";

import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import AppModal from "../../../../components/menus/AppModal";
import CategoryItem from "../../../../components/items/CategoryItem";

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
    const { categories } = useCategories();

    const [ isSetModalVisible, setIsSetModalVisible ] = useState<boolean>(false);
    const [ isChoiceModalVisible, setIsChoiceModalVisible ] = useState<boolean>(false);

    const [ selectedCategory, setSelectedCategory ] = useState<string>("Нет");

    const categoriesWithNone = useMemo(() => {
        return [
            { name: "Нет", color: "#ababab" },
            ...categories
        ];
    }, [categories]);

    return (
        <View style={ styles.container }>
            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => setIsSetModalVisible(true)} />
            </FloatingActions>

            <AppModal visible={ isSetModalVisible } onPress={() => {
                setSelectedCategory("Нет");
                setIsSetModalVisible(false);
            }} >
                <ScrollView contentContainerStyle={ styles.modal }>
                    <View style={ styles.form }>
                        <TextInput
                            style={ [ styles.textInput, styles.shadow ] }
                            placeholder="Название" />
                        <TextInput
                            style={ [ styles.textInput, styles.shadow ] } 
                            placeholder="Версия (необязательно)" />
                    </View>
                    <TouchableOpacity onPress={() => setIsChoiceModalVisible(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <AppText>Категория</AppText>
                            <Ionicons name="chevron-down-outline" size={ 16 } />
                        </View>
                        <AppText numberOfLines={ 4 }>{ selectedCategory }</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [ styles.createButton, styles.shadow ] }>
                        <AppText style={{ color: theme.colors.onPrimary }}>Создать набор</AppText>
                    </TouchableOpacity>
                </ScrollView>
            </AppModal>

            <AppModal visible={ isChoiceModalVisible } onPress={() => setIsChoiceModalVisible(false)}>
                <View style={{ height: 300 }}>
                    <FlatList
                        style={{ backgroundColor: theme.colors.bgDark, borderRadius: 5, padding: theme.spacing.sm }}
                        data={ categoriesWithNone }
                        renderItem={ ({ item }) => {
                            let name = item.name;

                            if (name.length >= 18) {
                                name = name.slice(0, 15) + "...";
                            }

                            return ( 
                                <CategoryItem 
                                name={ name }
                                color={ item.color }
                                onPress={() => {
                                    setSelectedCategory( item.name );
                                    setIsChoiceModalVisible(false);
                                }}
                                onSideButtonPress={() => {}} />
                            )
                        } }
                        ItemSeparatorComponent={() => (
                            <View style={{ height: theme.spacing.md }} />
                        )} />
                </View>

                <TouchableOpacity
                    style={[ styles.shadow , {
                        justifyContent: 'center',
                        alignItems: 'center', 
                        alignSelf: 'flex-end', 
                        width: 50, 
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: theme.colors.primary 
                    } ]}
                    onPress={() => {
                        setIsChoiceModalVisible(false);
                        setIsSetModalVisible(false);
                        navigation.navigate("CreateCategory", {
                            onGoBack: () => {
                                setIsSetModalVisible(true);
                                setIsChoiceModalVisible(true);
                            }
                        });
                    }}>
                    <Ionicons name="add" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
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
        gap: theme.spacing.lg,

        padding: theme.spacing.sm
    },
    form: {
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
    },

    shadow: {
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});