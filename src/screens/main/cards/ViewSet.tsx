import { useLayoutEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { SetsStackParamList } from "../../../navigation/types";

import useCards from "../../../hooks/useCards";

import { StyleSheet, View, FlatList } from "react-native";
import AppText from "../../../../components/AppText";
import CardItem from "../../../../components/items/CardItem";
import FloatingActions from "../../../../components/menus/FloatingActions";
import FloatingActionsButton from "../../../../components/buttons/FloatingActionsButton";

import { theme } from "../../../theme";

type Props = StackScreenProps<SetsStackParamList, "ViewSet">;

export default function ViewSet({ navigation, route }: Props) {
    const { set } = route.params;
    const { cards } = useCards(set.id);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: set.title
        });
    }, [set]);

    return (
        <View style={ styles.container }>
            <FlatList
                data={ cards }
                numColumns={ 2 } 
                columnWrapperStyle={{ gap: theme.spacing.md }}
                renderItem={({ item }) => (
                    <CardItem 
                        front={ item.front }
                        back={ item.back }
                        onPress={ () => navigation.navigate("ViewCard", { cardId: item.id, front: item.front, back: item.back }) } />
                )}/>

            <FloatingActions>
                <FloatingActionsButton name="add" color={ theme.colors.text } onPress={() => navigation.navigate("ViewCard", { setId: set.id })} />
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