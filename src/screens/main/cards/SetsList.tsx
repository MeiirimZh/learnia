import { useState, useEffect } from "react";

import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SetsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import * as SetsQueries from "../../../database/queries/SetsQueries";
import useSets from "../../../hooks/useSets";
import useCategories from "../../../hooks/useCategories";

import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import AppModal from "../../../../components/menus/AppModal";
import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';
import SetItem from "../../../../components/items/SetItem";
import CategoryItem from "../../../../components/items/CategoryItem";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { theme } from "../../../theme";

import { getTodayFormatted } from "../../../utils/date";

type SetsNav = StackNavigationProp<SetsStackParamList, "SetsList">;
type RootNav = StackNavigationProp<RootStackParamList>;

type NavigationProp = CompositeNavigationProp<SetsNav, RootNav>;

type Props = {
    navigation: NavigationProp;
};

export default function SetsList({ navigation }: Props) {
    const db = useSQLiteContext();
    const { sets, loadSets } = useSets();
    const { categories } = useCategories();

    const [ isSetModalVisible, setIsSetModalVisible ] = useState<boolean>(false);
    const [ isChoiceModalVisible, setIsChoiceModalVisible ] = useState<boolean>(false);

    const [ id, setId ] = useState<number | null>(null);
    const [ title, setTitle ] = useState<string>("");
    const [ version, setVersion ] = useState<string>("");
    const [ categoryId, setCategoryId ] = useState<number>(1);
    const [ selectedCategory, setSelectedCategory ] = useState<string>("Нет");

    useEffect(() => {
        const category = categories.find(
            (category) => category.id === categoryId
        );
        const categoryName = category?.name ?? "Нет";  

        setSelectedCategory(categoryName);
    }, [categoryId]);

    const reset = () => {
        closeAllModals();
        setId(null);
        setTitle("");
        setVersion("");
        setCategoryId(1);
    };

    const showInvalidTitleToast = () => {
        Toast.show({
            type: 'error',
            text1: '⚠️ Ошибка!',
            text2: 'Вы не заполнили название'
        });
    };

    const createSet = async () => {
        if (!title) {
            showInvalidTitleToast();
            return;
        };

        let setVersion = version ? version : "1.0";

        await db.runAsync(SetsQueries.INSERT, [
            title,
            getTodayFormatted(),
            setVersion,
            categoryId
        ]);

        await loadSets();

        reset();
    };

    const updateSet = async () => {
        if (!title) {
            showInvalidTitleToast();
            return;
        }

        await db.runAsync(SetsQueries.UPDATE, [
            title,
            getTodayFormatted(),
            version,
            categoryId,
            id
        ]);

        await loadSets();

        reset();
    };

    const closeAllModals = () => {
        setIsChoiceModalVisible(false);
        setIsSetModalVisible(false);
    };

    const openAllModals = () => {
        setIsSetModalVisible(true);
        setIsChoiceModalVisible(true);
    };

    return (
        <View style={ styles.container }>
            <FlatList
                style={{ flex: 1 }}
                data={ sets }
                renderItem={ ({ item }) => {
                    const category = categories.find(
        		        (category) => category.id === item.category_id
        	        );
                    const color = category?.color ?? "#ababab";

                    return ( 
                        <SetItem 
                            title={ item.title }
                            color={ color }
                            totalCardsCount={ 1 }
                            onPressMain={() => navigation.navigate("ViewSet", { set: item })}
                            onPressReview={() => {}}
                            onPressPractice={() => {}}
                            onOptionsPress={() => {
                                setId(item.id);
                                setTitle(item.title);
                                setVersion(item.version);
                                setCategoryId(item.category_id);

                                setIsSetModalVisible(true);
                            }}
                            onPressShare={() => {}} />
                    )
                }}
                ItemSeparatorComponent={() => ( <View style={{ height: theme.spacing.md }} /> )}
                showsVerticalScrollIndicator={ false } />

            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => setIsSetModalVisible(true)} />
            </FloatingActions>

            <AppModal visible={ isSetModalVisible } onPress={() => {
                reset()
            }} >
                <ScrollView contentContainerStyle={ styles.modal }>
                    <View style={ styles.form }>
                        <TextInput
                            style={ [ styles.textInput, styles.shadow ] }
                            value={ title }
                            onChangeText={ setTitle }
                            placeholder="Название" />
                        <TextInput
                            style={ [ styles.textInput, styles.shadow ] }
                            value={ version }
                            onChangeText={ setVersion }
                            placeholder="Версия (необязательно)" />
                    </View>
                    <TouchableOpacity onPress={() => setIsChoiceModalVisible(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <AppText>Категория</AppText>
                            <Ionicons name="chevron-down-outline" size={ 16 } />
                        </View>
                        <AppText numberOfLines={ 4 }>{ selectedCategory }</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={ [ styles.createButton, styles.shadow ] }
                        onPress={() => {
                            if (id) {
                                updateSet();
                            }
                            else {
                                createSet();
                            }
                        }}>
                        <AppText style={{ color: theme.colors.onPrimary }}>{ id ? "Изменить набор" : "Создать набор" }</AppText>
                    </TouchableOpacity>
                </ScrollView>
            </AppModal>

            <AppModal visible={ isChoiceModalVisible } onPress={() => setIsChoiceModalVisible(false)}>
                <View style={{ height: 300 }}>
                    <FlatList
                        style={{ backgroundColor: theme.colors.bgDark, borderRadius: 5, padding: theme.spacing.sm }}
                        data={ categories }
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
                                    setCategoryId(item.id);
                                    setSelectedCategory(item.name);
                                    setIsChoiceModalVisible(false);
                                }}
                                onSideButtonPress={() => {
                                    if (item.name !== "Нет") {
                                        closeAllModals();

                                        navigation.navigate("ViewCategory", {
                                            category: item,
                                            onGoBack: () => {
                                                openAllModals();
                                            }
                                        });
                                    }
                                }} />
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
                        closeAllModals();
                        navigation.navigate("ViewCategory", {
                            onGoBack: () => {
                                openAllModals();
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