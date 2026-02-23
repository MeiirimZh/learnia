import { useState, useEffect } from "react";
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

    useEffect(() => {
        loadNotes();
    }, []);

    return { notes, setNotes, loading };
};

export default useNotes;