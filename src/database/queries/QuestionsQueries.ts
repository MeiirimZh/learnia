export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        right_answer_1 INTEGER NOT NULL,
        right_answer_2 INTEGER NOT NULL,
        right_answer_3 INTEGER NOT NULL,
        right_answer_4 INTEGER NOT NULL,
        answer_1 TEXT NOT NULL,
        answer_2 TEXT NOT NULL,
        answer_3 TEXT NOT NULL,
        answer_4 TEXT NOT NULL,
        test_id INTEGER,

        FOREIGN KEY (test_id) REFERENCES tests(id)
    );
`;

export const INSERT = `
    INSERT INTO questions (question, right_answer_1, right_answer_2, right_answer_3, right_answer_4, answer_1, answer_2, answer_3, answer_4, test_id)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS questions;
`;