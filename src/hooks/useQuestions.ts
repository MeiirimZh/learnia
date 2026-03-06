import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import { Question } from "../../types";

const useQuestions = (testId?: number) => {
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadQuestions = async () => {
        setLoading(true);

        try {
            const query = testId
                ? "SELECT * FROM questions WHERE test_id = ? ORDER BY id;"
                : "SELECT * FROM questions ORDER BY id;";
            const params = testId ? [testId] : [];

            const results = await db.getAllAsync<Question>(query, params);
            setQuestions(results);
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
            loadQuestions();
        }, [testId])
    );

    return { questions, setQuestions, loading, loadQuestions };
};

export default useQuestions;