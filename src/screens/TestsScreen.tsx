import { useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TestsScreenNavigationProp } from '../types';

import Search from '../components/Search';
import Test from '../components/Test';
import FloatingActions from '../components/menus/FloatingActions';
import FloatingActionsButton from '../components/buttons/FloatingActionsButton';

import { theme } from '../src/theme';

type Props = {
    navigation: TestsScreenNavigationProp;
};

export default function TestsScreen({ navigation }: Props) {
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

    const tests = [
        {title: 'Python', totalQuestionsCount: 10, lastResult: 100, key: '1'},
        {title: 'Java', totalQuestionsCount: 20, lastResult: 80, key: '2'},
        {title: 'C#', totalQuestionsCount: 30, lastResult: 63, key: '3'},
        {title: 'JavaScript', totalQuestionsCount: 40, lastResult: 50, key: '4'},
        {title: 'C++', totalQuestionsCount: 50, lastResult: 70, key: '5'},
        {title: 'Dart', totalQuestionsCount: 60, lastResult: 80, key: '6'}
    ];

    return (
        <View style={ styles.main } >
            <FlatList showsVerticalScrollIndicator={ false }
                data={ tests }
                renderItem={({ item }) => (
                    <Test title={ item.title } totalQuestionsCount={ item.totalQuestionsCount } lastResult={ item.lastResult }
                        onPressMain={() => console.log("Main")} onPressStart={() => console.log("Start")} />
                )}
                ItemSeparatorComponent={() => <View style={ {height: theme.spacing.md} } />}
            />

            <FloatingActions>
                <FloatingActionsButton name='add' color={ theme.colors.text } onPress={() => console.log("Add")} />
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