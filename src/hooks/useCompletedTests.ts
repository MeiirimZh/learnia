import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { CompletedTest } from "../../types";

const useCompletedTests = () => {
    const [ completedTests, setCompletedTests ] = useState<CompletedTest[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadCompletedTests = async () => {
        setLoading(true);

        try {
            const results = await db.getAllAsync<CompletedTest>("SELECT * FROM completed_tests ORDER BY id;");
            setCompletedTests(results);
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
            loadCompletedTests();
        }, [])
    );

    return { completedTests, setCompletedTests, loading, loadCompletedTests };
};

export default useCompletedTests;