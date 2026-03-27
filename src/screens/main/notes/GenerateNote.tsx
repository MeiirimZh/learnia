import { useState, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { callAskGemini } from "../../../firebase/firebase";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useNotes from "../../../hooks/useNotes";
import * as NotesQueries from "../../../database/queries/NotesQueries";

import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../../../components/AppText";

import { theme } from "../../../theme";

import { getTodayFormatted } from "../../../utils/date";

type Props = StackScreenProps<NotesStackParamList, "GenerateNote">;

export default function GenerateNote({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const db = useSQLiteContext();
    const { notes, loadNotes } = useNotes();

    const [ prompt, setPrompt ] = useState<string>("");
    const [ answer, setAnswer ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ noteId, setNoteId ] = useState<number>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: theme.colors.onPrimary
        });
    }, []);

    const addNote = async (text: string) => {
        const result = await db.runAsync(NotesQueries.INSERT, [
            "ИИ заметка",
            text,
            getTodayFormatted()
        ]);

        const newNote = {
            id: result.lastInsertRowId,
            title: "ИИ заметка",
            content: text,
            creation_date: getTodayFormatted()
        };

        await loadNotes();

        return newNote;
    };

    const handleSend = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setAnswer(null);

        try {
            const result = await callAskGemini({ prompt });
            setAnswer(result.data.answer);
            
            const newNote = await addNote(result.data.answer);

            navigation.replace("ViewNote", { note: newNote, isReadMode: true })
        }
        catch (error) {
            console.error(error);
            setAnswer("Ошибка при вызове Gemini");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={[ styles.container, { paddingBottom: insets.bottom } ]}>
            <TextInput
                style={{ flex: 1, backgroundColor: theme.colors.bgLight, fontSize: 16, borderRadius: 10, padding: theme.spacing.md }}
                multiline
                value={ prompt }
                onChangeText={ setPrompt }
                textAlignVertical="top"
                scrollEnabled={ true } />
            {loading ? 
            <ActivityIndicator size="large" color={ theme.colors.primary } /> :
            <TouchableOpacity style={{ 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: theme.colors.primary, 
                borderRadius: 10,
                padding: theme.spacing.md }}
                disabled={ loading }
                onPress={ handleSend }>
                <AppText style={{ color: theme.colors.onPrimary }}>Сгенерировать</AppText>
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: theme.spacing.md,
        padding: theme.spacing.md
    }
});