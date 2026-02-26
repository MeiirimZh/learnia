import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Set } from "../../types";

const useSets = () => {
    const [ sets, setSets ] = useState<Set[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadSets = async () => {
        try {
            const results = await db.getAllAsync<Set>("SELECT * FROM sets ORDER BY id;");
            setSets(results);
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
            loadSets();
        }, [])
    );

    return { sets, setSets, loading, loadSets };
};
    
export default useSets;