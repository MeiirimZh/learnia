import { useState, useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import * as CardsQueries from "../../../database/queries/CardsQueries";

import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../theme";

type Props = StackScreenProps<SetsStackParamList, "ViewCard">;

const VERTICAL_PADDING = theme.spacing.md * 2;
const MAX_LINES = 4;
const LINE_HEIGHT = 22;
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT + VERTICAL_PADDING;

export default function ViewCard({ navigation, route }: Props) {
    const db = useSQLiteContext();

    const cardId = route.params?.cardId ?? null;
    const setId = route.params?.setId ?? null;

    const [ height, setHeight ] = useState<number>(LINE_HEIGHT);
    const [ front, setFront ] = useState<string>("");
    const [ back, setBack ] = useState<string>("");

    const addCard = async () => {
        await db.runAsync(CardsQueries.INSERT, [
            front,
            back,
            setId
        ]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: cardId ? "Изменение карточки" : "Создание карточки",
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={async () => {
                        if (cardId) {

                        }
                        else {
                            await addCard();
                        }

                        navigation.goBack();
                    }}>
                    <Ionicons name="checkmark" size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            )
        });
    }, [front, back, cardId, setId]);

    return (
        <View style={ styles.container }>
            <TextInput
                multiline
                scrollEnabled={ height >= MAX_HEIGHT }
                onContentSizeChange={(e) => {
                    const contentHeight = e.nativeEvent.contentSize.height;
                    setHeight(Math.min(contentHeight, MAX_HEIGHT));
                }}
                textAlignVertical="top"
                style={ [styles.textInput, { height }] }
                value={ front }
                onChangeText={ setFront }
                placeholder="Термин" />
            <TextInput
                multiline
                scrollEnabled={ height >= MAX_HEIGHT }
                onContentSizeChange={(e) => {
                    const contentHeight = e.nativeEvent.contentSize.height;
                    setHeight(Math.min(contentHeight, MAX_HEIGHT));
                }}
                textAlignVertical="top"
                style={ [styles.textInput, { height }] }
                value={ back }
                onChangeText={ setBack }
                placeholder="Определение"
                />
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