import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { INSERT, UPDATE } from "../../../database/queries/NotesQueries";

import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import Markdown from "react-native-markdown-display";
import { Note } from "../../../../types";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<NotesStackParamList, "ViewNote">;

export default function ViewNote({ navigation, route }: Props) {
    const db = useSQLiteContext();

    const { note, isReadMode } = route.params;

    const [ noteContent, setNoteContent ] = useState<string>(note?.content ?? "");
    const [ noteId, setNoteId ] = useState<number | null>(note?.id ?? null);
    const [ readMode, setReadMode ] = useState<boolean>(isReadMode);
    const [ today, setToday ] = useState<Date>(new Date());
    
    const saveTimer = useRef<NodeJS.Timeout | null>(null);

    const saveNote = async () => {
        let day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
        let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
        let date = `${today.getFullYear()}-${month}-${day}`;

        if (noteId) {
            await db.runAsync(UPDATE, [
                note?.title ?? "Новая заметка",
                noteContent,
                note?.creation_date ?? date,
                noteId
            ]);
        }
        else {
            const result = await db.runAsync(INSERT, [
                "Новая заметка",
                noteContent,
                date
            ]);
 
            setNoteId(result.lastInsertRowId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} 
                    onPress={() => setReadMode(prev => !prev)}>
                    <Ionicons name={ readMode ? "pencil" : "book" } size={ 24 } color={ theme.colors.onPrimary } />
                </TouchableOpacity>
            ),
            headerRightContainerStyle: {
                paddingRight: theme.spacing.md
            },
            title: note?.title ?? "Новая заметка"
        });
    }, [navigation, note, readMode]);

    useEffect(() => {
        if (saveTimer.current) {
            clearTimeout(saveTimer.current);
        }

        saveTimer.current = setTimeout(() => {
            saveNote();
        }, 1000);

        return () => {
            if (saveTimer.current) {
                clearTimeout(saveTimer.current);
            }
        };
    }, [noteContent]);

    if (!readMode) {
        return (
            <View style={ styles.container }>
                <TextInput
                    style={ styles.textInput }
                    value={ noteContent }
                    onChangeText={ setNoteContent }
                    multiline
                    textAlignVertical="top" />
            </View>
        )
    }

    if (readMode) {
        return (
            <View style={ styles.container }>
                <View style={{ 
                    flex: 1,
                    borderRadius: 10,
                    backgroundColor: theme.colors.bgLight}}>
                    <ScrollView style={ styles.scrollView }>
                        <Markdown>
                            { noteContent }
                        </Markdown>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    },
    textInput: {
        flex: 1,

        borderRadius: 10,

        backgroundColor: theme.colors.bgLight,
        padding: theme.spacing.md
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: theme.spacing.md
    },
});