import { useState, useLayoutEffect } from "react";

import { callAskGemini } from "../../../firebase/firebase";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import { useSQLiteContext } from "expo-sqlite";
import useNotes from "../../../hooks/useNotes";
import * as NotesQueries from "../../../database/queries/NotesQueries";

import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";

import { theme } from "../../../theme";

import { getTodayFormatted } from "../../../utils/date";

type Props = StackScreenProps<NotesStackParamList, "GenerateNote">;

export default function GenerateNote({ navigation, route }: Props) {
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
            "ИИ-конспект",
            text,
            getTodayFormatted()
        ]);

        setNoteId(result.lastInsertRowId);

        await loadNotes();
    };

    const handleSend = async () => {
        console.log("SEND CLICKED");

        if (!prompt.trim()) return;

        setLoading(true);
        setAnswer(null);

        try {
            const result = await callAskGemini({ prompt });
            setAnswer(result.data.answer);
            await addNote(result.data.answer);

            const note = returnNote();

            navigation.navigate("ViewNote", { note, isReadMode: true })
        }
        catch (error) {
            console.error(error);
            setAnswer("Ошибка при вызове Gemini");
        }
        finally {
            setLoading(false);
        }
    };

    const returnNote = () => notes.find(note => note.id === noteId);

    return (
        <View style={ styles.container }>
            <TextInput
                style={{ flex: 1, backgroundColor: theme.colors.bgLight, fontSize: 16, borderRadius: 10, padding: theme.spacing.md }}
                multiline
                value={ prompt }
                onChangeText={ setPrompt }
                textAlignVertical="top" />
            <TouchableOpacity style={{ 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: theme.colors.primary, 
                borderRadius: 10,
                padding: theme.spacing.md }}
                onPress={handleSend}>
                <AppText style={{ color: theme.colors.onPrimary }}>Сгенерировать</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: theme.spacing.md,
        padding: theme.spacing.md
    }
});