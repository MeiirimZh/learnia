import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { StudiedCard } from "../../types";

const useStudiedCards = (setId?: number) => {
    const [ studiedCards, setStudiedCards ] = useState<StudiedCard[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadStudiedCards = async () => {
        setLoading(true);

        try {
            const query = setId
                ? "SELECT s.id, card_id, studied_at, is_correct FROM studied_cards AS s JOIN cards ON s.card_id = cards.id WHERE set_id = ? ORDER BY s.id;"
                : "SELECT * FROM studied_cards ORDER BY id;";
            const params = setId ? [setId] : [];

            const results = await db.getAllAsync<StudiedCard>(query, params);
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
        }, [setId])
    );

    return { studiedCards, setStudiedCards, loading, loadStudiedCards };
};

export default useStudiedCards;