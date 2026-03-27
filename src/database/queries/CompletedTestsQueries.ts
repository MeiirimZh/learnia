export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS completed_tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        completed_at TEXT NOT NULL,

        FOREIGN KEY (test_id) REFERENCES tests(id)
    );
`;

export const INSERT = `
    INSERT INTO completed_tests (test_id, score, completed_at) VALUES
    (?, ?, ?);
`;

export const DELETE = `
    DELETE FROM completed_tests
    WHERE test_id = ?;
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS completed_tests;
`;