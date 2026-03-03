import { useState, useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useCards from "../../../hooks/useCards";
import * as CardsQueries from "../../../database/queries/CardsQueries";

import { StyleSheet, View, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import CardItem from "../../../../components/items/CardItem";
import FloatingActions from "../../../../components/menus/FloatingActions";
import FloatingActionsButton from "../../../../components/buttons/FloatingActionsButton";

import { theme } from "../../../theme";

type Props = StackScreenProps<SetsStackParamList, "ViewSet">;

export default function ViewSet({ navigation, route }: Props) {
    const db = useSQLiteContext();
    const { set } = route.params;
    const { cards, loadCards } = useCards(set.id);

    const [ isDeleteMode, setIsDeleteMode ] = useState<boolean>(false);
    const [ cardsToDelete, setCardsToDelete ] = useState<number[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set.title
        });
    }, [set]);

    useEffect(() => {
        const onBackPress = () => {
            if (isDeleteMode) {
                setIsDeleteMode(false);
                setCardsToDelete([]);
                return true;
            }

            return false;
        };

        const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => subscription.remove();
    }, [isDeleteMode]);

    const deleteCard = async (id: number) => {
        await db.runAsync(CardsQueries.DELETE, [
            id
        ]);

        await loadCards();
    };

    return (
        <View style={ styles.container }>
            <FlatList
                data={ cards }
                numColumns={ 2 } 
                columnWrapperStyle={{ gap: theme.spacing.md }}
                renderItem={({ item }) => {
                    const deleteSelected = cardsToDelete.includes(item.id);

                    return ( 
                        <CardItem 
                            front={ item.front }
                            back={ item.back }
                            showDeleteMarker={ isDeleteMode }
                            deleteSelected={ deleteSelected }
                            onPress={ () => {
                                if (isDeleteMode) {
                                    if (cardsToDelete.includes(item.id)) {
                                        setCardsToDelete(prev => 
                                            prev.filter(id => id !== item.id)
                                        );
                                    }
                                    else {
                                        setCardsToDelete(prev => [...prev, item.id]);
                                    }
                                }
                                else {
                                    navigation.navigate("ViewCard", { cardId: item.id, front: item.front, back: item.back })
                                }
                            } }
                            onLongPress={ () => {
                                    if (isDeleteMode) {
                                        setCardsToDelete([]);
                                        setIsDeleteMode(false);
                                    }
                                    else {
                                        setCardsToDelete(prev => [...prev, item.id]);
                                        setIsDeleteMode(true);
                                    }
                                }
                            } />
                    )
                }}/>

            <FloatingActions>
                { isDeleteMode ?
                <FloatingActionsButton name='trash' color={ theme.colors.text } onPress={async () => {
                    await Promise.all(
                        cardsToDelete.map(id => deleteCard(id))
                    );
                    setCardsToDelete([]);
                    setIsDeleteMode(false);
                }} /> :
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => navigation.navigate("ViewCard", { setId: set.id })} />
                }
            </FloatingActions>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});