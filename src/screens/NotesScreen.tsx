import { useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NotesScreenNavigationProp } from '../types';
import { theme } from '../src/theme';

import Search from '../components/Search';
import Note from '../components/Note';
import FloatingActions from '../components/menus/FloatingActions';
import FloatingActionsButton from '../components/buttons/FloatingActionsButton';
import GradientBorderButton from '../components/GradientBorderButton';
import { Ionicons } from "@expo/vector-icons";

type Props = {
    navigation: NotesScreenNavigationProp;
};

export default function NotesScreen({ navigation }: Props) {
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

    const notes = [
        {content: 'Lorem ipsum', title: 'Термодинамика', date: '20 декаб.', key: '1'},
        {content: 'Lorem ipsum', title: 'Линейная алгебра: основы', date: '21 декаб.', key: '2'},
        {content: 'Lorem ipsum', title: 'Биология', date: '22 декаб.', key: '3'},
        {content: 'Lorem ipsum', title: 'Геофизика', date: '23 декаб.', key: '4'},
        {content: 'Lorem ipsum', title: 'Математика', date: '24 декаб.', key: '5'},
        {content: 'Lorem ipsum', title: 'Казахский язык', date: '25 декаб.', key: '6'}
    ];

    return (
        <View style={ styles.main } >
            <FlatList showsVerticalScrollIndicator={ false }
                data={ notes } numColumns={ 2 } columnWrapperStyle={{gap: theme.spacing.md}}
                renderItem={({ item }) => (
                    <Note content={ item.content } title={ item.title } date={ item.date } onPress={ () => console.log("Note pressed") } />
                )}
                ItemSeparatorComponent={() => <View style={ {height: theme.spacing.md} } />} />

            <FloatingActions>
                <FloatingActionsButton name='add' color={ theme.colors.text } onPress={() => console.log("Add")} />
                
                <GradientBorderButton onPress={() => {}} colors={ theme.colors.gradientPrimary } width={ 56 } height={ 56 }>
                    <Ionicons name="sparkles" size={ 24} />
                </GradientBorderButton>
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