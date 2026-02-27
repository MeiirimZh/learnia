import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Card } from "../../types";

const useCards = (setId?: number) => {
    const [ cards, setCards ] = useState<Card[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadCards = async () => {
        setLoading(true);

        try {
            const query = setId
                ? "SELECT * FROM cards WHERE set_id = ? ORDER BY id;"
                : "SELECT * FROM cards ORDER BY id;";
            const params = setId ? [setId] : [];

            const results = await db.getAllAsync<Card>(query, params);
            setCards(results);
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
            loadCards();
        }, [setId])
    );

    return { cards, setCards, loading, loadCards };
};
    
export default useCards;