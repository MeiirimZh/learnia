export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS repetitions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_1 TEXT NOT NULL,
        date_2 TEXT NOT NULL,
        date_3 TEXT NOT NULL,
        date_4 TEXT NOT NULL,
        date_5 TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO repetitions (date_1, date_2, date_3, date_4, date_5) VALUES
    (?, ?, ?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF NOT EXISTS repetitions;
`;