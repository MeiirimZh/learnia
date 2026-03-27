import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { StudiedCard } from "../../types";

const useStudiedCards = () => {
    const [ studiedCards, setStudiedCards ] = useState<StudiedCard[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadStudiedCards = async () => {
        try {
            const results = await db.getAllAsync<StudiedCard>("SELECT * FROM studied_cards ORDER BY id;");
            setStudiedCards(results);
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
            loadStudiedCards();
        }, [])
    );

    return { studiedCards, setStudiedCards, loading, loadStudiedCards };
};

export default useStudiedCards;