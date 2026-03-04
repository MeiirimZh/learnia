import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Test } from "../../types";

const useTests = () => {
    const [ tests, setTests ] = useState<Test[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadTests = async () => {
        try {
            const results = await db.getAllAsync<Test>("SELECT * FROM tests ORDER BY id;");
            setTests(results);
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
            loadTests();
        }, [])
    );

    return { tests, setTests, loading, loadTests };
};

export default useTests;