import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Category } from "../../types";

const useCategories = () => {
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadCategories = async () => {
        try {
            const results = await db.getAllAsync<Category>("SELECT * FROM categories ORDER BY id;");
            setCategories(results);
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
            loadCategories();
        }, [])
    );

    return { categories, setCategories, loading, loadCategories };
};

export default useCategories;