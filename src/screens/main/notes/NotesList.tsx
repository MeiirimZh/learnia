import { useState, useEffect } from "react";
import { BackHandler } from "react-native";

import { useSQLiteContext } from "expo-sqlite";
import useNotes from "../../../hooks/useNotes";
import * as NotesQueries from "../../../database/queries/NotesQueries";

import { StyleSheet, View, FlatList } from "react-native";
import NoteItem from "../../../../components/items/NoteItem";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';
import GradientBorderButton from "../../../../components/GradientBorderButton";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

import { getFormattedMonthDayFromDateString } from "../../../utils/date";
import { handleNotesImport } from "../../../utils/sharing";

type Props = StackScreenProps<NotesStackParamList, "NotesList">;

export default function NotesList({ navigation }: Props) {
    const db = useSQLiteContext();
    const { notes, loadNotes } = useNotes();

    const [ isDeleteMode, setIsDeleteMode ] = useState<boolean>(false);
    const [ notesToDelete, setNotesToDelete ] = useState<number[]>([]);

    useEffect(() => {
        const onBackPress = () => {
            if (isDeleteMode) {
                setIsDeleteMode(false);
                setNotesToDelete([]);
                return true;
            }

            return false;
        };

        const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => subscription.remove();
    }, [isDeleteMode]);

    const deleteNote = async (id: number) => {
        await db.runAsync(NotesQueries.DELETE, [
            id
        ]);

        await loadNotes();
    };

    return (
        <View style={ styles.container }>
            <FlatList 
                data={ notes } 
                numColumns={ 2 } 
                columnWrapperStyle={{gap: theme.spacing.md}}
                renderItem={({item}) => {
                    const deleteSelected = notesToDelete.includes(item.id);
                    
                    return (
                        <NoteItem 
                            title={ item.title } 
                            content={ item.content }
                            date={ getFormattedMonthDayFromDateString(item.creation_date) }
                            showDeleteMarker={ isDeleteMode }
                            deleteSelected={ deleteSelected }
                            onPress={ () => {
                                if (isDeleteMode) {
                                    if (notesToDelete.includes(item.id)) {
                                        setNotesToDelete(prev => 
                                            prev.filter(id => id !== item.id)
                                        );
                                    }
                                    else {
                                        setNotesToDelete(prev => [...prev, item.id]);
                                    }
                                }
                                else {
                                    navigation.navigate("ViewNote", { note: item, isReadMode: true })
                                }
                            }}
                            onLongPress={ () => {
                                if (isDeleteMode) {
                                    setNotesToDelete([]);
                                    setIsDeleteMode(false);
                                }
                                else {
                                    setNotesToDelete(prev => [...prev, item.id]);
                                    setIsDeleteMode(true);
                                }
                            }} />
                    )
                }}
                ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
                showsVerticalScrollIndicator={ false } />

            <FloatingActions>
                { isDeleteMode ?
                    <FloatingActionsButton name='trash' color={ theme.colors.text } onPress={async () => {
                        await Promise.all(
                            notesToDelete.map(id => deleteNote(id))
                        );
                        setNotesToDelete([]);
                        setIsDeleteMode(false);
                    }} /> :
                    <>
                    <FloatingActionsButton name='add' color={ theme.colors.text } onPress={() => navigation.navigate("ViewNote", { isReadMode: false })} />
                    <FloatingActionsButton name="download-outline" color={ theme.colors.text } onPress={async () => {
                        await handleNotesImport(db);
                        await loadNotes();
                    }} />

                    <GradientBorderButton onPress={() => {}} colors={ theme.colors.gradientPrimary } width={ 56 } height={ 56 }>
                        <Ionicons name="sparkles" size={ 24} />
                    </GradientBorderButton>
                    </>
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