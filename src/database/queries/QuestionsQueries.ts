export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        is_answer_1_correct BOOL NOT NULL,
        is_answer_2_correct BOOL NOT NULL,
        is_answer_3_correct BOOL NOT NULL,
        is_answer_4_correct BOOL NOT NULL,
        answer_1 TEXT NOT NULL,
        answer_2 TEXT NOT NULL,
        answer_3 TEXT NOT NULL,
        answer_4 TEXT NOT NULL,
        test_id INTEGER,

        FOREIGN KEY (test_id) REFERENCES tests(id)
    );
`;

export const INSERT = `
    INSERT INTO questions (question, is_answer_1_correct, is_answer_2_correct, is_answer_3_correct, is_answer_4_correct, answer_1, answer_2, answer_3, answer_4, test_id)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const DELETE = `
    DELETE FROM questions
    WHERE id = ?;
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS questions;
`;