import { useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CardsScreenNavigationProp } from '../types';

import Search from '../components/Search';
import CardsSet from '../components/CardsSet';
import FloatingActions from '../components/menus/FloatingActions';
import FloatingActionsButton from '../components/buttons/FloatingActionsButton';

import { theme } from '../src/theme';

type Props = {
    navigation: CardsScreenNavigationProp;
};

export default function CardsScreen({ navigation }: Props) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search onPress={() => {} } />
            ),
            headerRightContainerStyle: { 
                paddingRight: 10 
            }
        });
    }, [navigation]);

    const cardsSet = [
        {title: 'Английский язык', totalCardsCount: 130, key: '1'},
        {title: 'Математика', totalCardsCount: 54, key: '2'},
        {title: 'Биология', totalCardsCount: 61, key: '3'},
        {title: 'Физика', totalCardsCount: 103, key: '4'},
        {title: 'Химия', totalCardsCount: 80, key: '5'}
    ];

    return (
        <View style={ styles.main }>
            <FlatList showsVerticalScrollIndicator={ false }
                data={ cardsSet } 
                renderItem={({ item }) => (
                    <CardsSet title={ item.title } totalCardsCount={ item.totalCardsCount }
                        onPressMain={() => console.log("Main")}
                        onPressReview={() => console.log("Review")} 
                        onPressPractice={() => console.log("Practice")} />
                )}
                ItemSeparatorComponent={() => <View style={ {height: theme.spacing.md} } />}
            />

            <FloatingActions>
                <FloatingActionsButton name='add' color={ theme.colors.text } onPress={() => console.log("Main")} />
            </FloatingActions>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: theme.spacing.md
    }
});