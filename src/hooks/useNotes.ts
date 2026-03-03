import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Note } from "../../types";

const useNotes = () => {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadNotes = async () => {
        try {
            const results = await db.getAllAsync<Note>("SELECT * FROM notes ORDER BY id;");
            setNotes(results);
        }
        catch (error) {
            console.log("Database error: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [])
    );

    return { notes, setNotes, loading, loadNotes };
};

export default useNotes;