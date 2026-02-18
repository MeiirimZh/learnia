export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS tests_repetitions (
        test_id INTEGER,
        repetition_id INTEGER,

        PRIMARY KEY (test_id, repetition_id),
        FOREIGN KEY (test_id) REFERENCES tests(id),
        FOREIGN KEY (repetition_id) REFERENCES repetitions(id)
    );
`;

export const INSERT = `
    INSERT INTO tests_repetitions VALUES
    (?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS tests_repetitions;
`;