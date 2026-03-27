import { useState, useEffect } from "react";

import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, TestsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import * as TestsQueries from "../../../database/queries/TestsQueries";
import useTests from "../../../hooks/useTests";
import useCategories from "../../../hooks/useCategories";
import useQuestions from "../../../hooks/useQuestions";
import useCompletedTests from "../../../hooks/useCompletedTests";

import { Question } from "../../../../types";

import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import AppModal from "../../../../components/menus/AppModal";
import TestItem from "../../../../components/items/TestItem";
import CategoryItem from "../../../../components/items/CategoryItem";
import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { theme } from "../../../theme";

import { getTodayFormatted } from "../../../utils/date";
import { shareJsonTests, handleTestsImport } from "../../../utils/sharing";
import { deleteCompletedTest } from "../../../utils/userProgress";

type TestsNav = StackNavigationProp<TestsStackParamList, "TestsList">;
type RootNav = StackNavigationProp<RootStackParamList>;

type NavigationProp = CompositeNavigationProp<TestsNav, RootNav>;

type Props = {
    navigation: NavigationProp;
};

export default function TestsList({ navigation }: Props) {
    const db = useSQLiteContext();
    const { tests, loadTests } = useTests();
    const { categories, loadCategories } = useCategories();
    const { questions, loadQuestions } = useQuestions();
    const { completedTests, loadCompletedTests } = useCompletedTests();

    const [ isTestModalVisible, setIsTestModalVisible ] = useState<boolean>(false);
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

    const closeAllModals = () => {
        setIsChoiceModalVisible(false);
        setIsTestModalVisible(false);
    };

    const openAllModals = () => {
        setIsTestModalVisible(true);
        setIsChoiceModalVisible(true);
    };

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

    const showNotEnoughtQuestionsToast = () => {
        Toast.show({
            type: 'error',
            text1: '⚠️ Ошибка!',
            text2: 'Тест пуст'
        });
    };

    const createTest = async () => {
        if (!title) {
            showInvalidTitleToast();
            return;
        };

        let testVersion = version ? version : "1.0";

        await db.runAsync(TestsQueries.INSERT, [
            title,
            getTodayFormatted(),
            testVersion,
            categoryId
        ]);

        await loadTests();
        reset();
    };

    const updateTest = async () => {
        if (!title) {
            showInvalidTitleToast();
            return;
        };

        await db.runAsync(TestsQueries.UPDATE, [
            title,
            getTodayFormatted(),
            version,
            categoryId,
            id
        ]);

        await loadTests();
        reset();
    };

    const deleteTest = async () => {
        await db.runAsync(TestsQueries.DELETE, [
            id
        ]);
        await deleteCompletedTest(db, completedTests, id);

        await loadTests();
        await loadCompletedTests();
        reset();
    };

    const getQuestionsByTestId = (testId: number) => {
        const testQuestions: Question[] = [];

        questions.forEach((element) => {
            if (element.test_id === testId) testQuestions.push(element);
        });

        return testQuestions;
    };

    return (
        <View style={ styles.container }>
            <FlatList
                data={ tests }
                renderItem={({ item }) => {
                    const category = categories.find(
        		        (category) => category.id === item.category_id
        	        );
                    const color = category?.color ?? "#ababab";

                    const testQuestions = getQuestionsByTestId(item.id);
                    const totalQuestionsCount = testQuestions.length;

                    return (
                        <TestItem 
                            title={ item.title }
                            color={ color }
                            totalQuestionsCount={ totalQuestionsCount }
                            lastResult={ 30 }
                            onPressMain={() => {
                                navigation.navigate("ViewTest", { test: item })
                            }}
                            onPressStart={() => {
                                if (totalQuestionsCount > 0) {
                                    navigation.navigate("TakeTest", { test: item });
                                }
                                else {
                                    showNotEnoughtQuestionsToast();
                                }
                            }}
                            onOptionsPress={() => {
                                setId(item.id);
                                setTitle(item.title);
                                setVersion(item.version);
                                setCategoryId(item.category_id);

                                setIsTestModalVisible(true);
                            }}
                            onPressShare={() => {
                                shareJsonTests(item, testQuestions, category ?? categories[0], "learnia-test", "Поделиться тестом");
                            }} />
                    )  
                }}
                ItemSeparatorComponent={() => ( <View style={{ height: theme.spacing.md }} /> )}
                showsVerticalScrollIndicator={ false } />

            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => {
                    setIsTestModalVisible(true)
                }} />
                <FloatingActionsButton name="download-outline" color={ theme.colors.text } onPress={async () => {
                    await handleTestsImport(db, categories);
                    await loadCategories();
                    await loadTests();
                    await loadQuestions();
                }} />
            </FloatingActions>

            <AppModal visible={ isTestModalVisible } onPress={() => {
                reset()
            }}>
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
                    <View style={ styles.form }>
                        <TouchableOpacity 
                            style={ [ styles.createButton, styles.shadow, { backgroundColor: theme.colors.primary } ] }
                            onPress={() => {
                                if (id) {
                                    updateTest();
                                }
                                else {
                                    createTest();
                                }
                            }}>
                            <AppText style={{ color: theme.colors.onPrimary }}>{ id ? "Изменить тест" : "Создать тест" }</AppText>
                        </TouchableOpacity>
                        {
                            id &&
                            <TouchableOpacity
                                style={ [ styles.createButton, styles.shadow, { backgroundColor: theme.colors.danger } ] }
                                onPress={() => deleteTest()}>
                                <AppText style={{ color: theme.colors.onPrimary }}>Удалить набор</AppText>
                            </TouchableOpacity>
                        }
                    </View>
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