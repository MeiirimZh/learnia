import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { INSERT, UPDATE, UPDATE_TITLE } from "../../../database/queries/NotesQueries";

import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";
import AppModal from "../../../../components/menus/AppModal";
import Markdown from "react-native-markdown-display";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

import { getTodayFormatted } from "../../../utils/date";
import { shareJsonNotes } from "../../../utils/sharing";

type Props = StackScreenProps<NotesStackParamList, "ViewNote">;

export default function ViewNote({ navigation, route }: Props) {
    const db = useSQLiteContext();

    const { note, isReadMode } = route.params;

    const [ noteContent, setNoteContent ] = useState<string>(note?.content ?? "");
    const [ noteId, setNoteId ] = useState<number | null>(note?.id ?? null);
    const [ noteTitle, setNoteTitle ] = useState<string>(note?.title ?? "Новая заметка");
    const [ readMode, setReadMode ] = useState<boolean>(isReadMode);
    const [ today, setToday ] = useState<Date>(new Date());
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    
    const saveTimer = useRef<NodeJS.Timeout | null>(null);

    const saveNote = async () => {
        let day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
        let month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
        let date = `${today.getFullYear()}-${month}-${day}`;

        if (noteId) {
            await db.runAsync(UPDATE, [
                noteTitle,
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
    };

    const changeTitle = async () => {
        await db.runAsync(UPDATE_TITLE, [
            noteTitle,
            noteId
        ]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <AppText style={{ fontSize: 20, fontFamily: theme.fonts.semibold, color: theme.colors.onPrimary }}>
                        { noteTitle }
                    </AppText>
                </TouchableOpacity>
            ),
            headerTintColor: theme.colors.onPrimary,
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                        onPress={ () => {
                            if (typeof note === 'undefined') {
                                shareJsonNotes({
                                    id: noteId ? noteId : 10000,
                                    title: noteTitle,
                                    content: noteContent,
                                    creation_date: getTodayFormatted()
                                }, "note", "Поделиться заметкой");
                            }
                            else {
                                shareJsonNotes(note, "note", "Поделиться заметкой");
                            }
                        } }>
                        <Ionicons name="share-social" size={ 24 } color={ theme.colors.onPrimary } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} 
                        onPress={() => setReadMode(prev => !prev)}>
                        <Ionicons name={ readMode ? "pencil" : "book" } size={ 24 } color={ theme.colors.onPrimary } />
                    </TouchableOpacity>
                </View>
            ),
            headerRightContainerStyle: {
                paddingRight: theme.spacing.md
            }
        });
    }, [navigation, noteTitle, readMode]);

    useEffect(() => {
        if (saveTimer.current) {
            clearTimeout(saveTimer.current);
        }

        saveTimer.current = setTimeout(() => {
            saveNote();
        }, 500);

        return () => {
            if (saveTimer.current) {
                clearTimeout(saveTimer.current);
            }
        };
    }, [noteContent]);

    return (
        <View style={ styles.container }>
            { !readMode ? (
                <TextInput
                    style={ [styles.textInput, { flex: 1, fontSize: 16 }] }
                    value={ noteContent }
                    onChangeText={ setNoteContent }
                    multiline
                    textAlignVertical="top" />
            ) : (
                <View style={{ 
                    flex: 1,
                    borderRadius: 10,
                    backgroundColor: theme.colors.bgLight
                    }}>
                    <ScrollView style={ styles.scrollView }>
                        <Markdown style={{
                            body: {
                                fontSize: 16
                            },
                            code_inline: {
                                backgroundColor: "#ededeb",
                                color: "#eb5757"
                            }
                        }}>
                            { noteContent }
                        </Markdown>
                    </ScrollView>
                </View>
            )}

            <AppModal visible={ isModalVisible } onPress={ () => {
                changeTitle();
                setIsModalVisible(false);
            } }>
                <TextInput 
                    style={ [styles.textInput, { fontSize: 16 }] }
                    value={ noteTitle }
                    onChangeText={ setNoteTitle }
                    placeholder="Введите название" />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: theme.spacing.md }}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                        <AppText style={{ fontSize: 16 }}>Отмена</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        changeTitle();
                        setIsModalVisible(false);
                    }}>
                        <AppText style={{ fontSize: 16 }}>Сохранить</AppText>
                    </TouchableOpacity>
                </View>
            </AppModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    },
    textInput: {
        borderRadius: 10,
        backgroundColor: theme.colors.bgLight,
        padding: theme.spacing.md
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: theme.spacing.md
    },
});