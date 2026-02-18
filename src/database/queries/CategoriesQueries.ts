export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO categories (name, color) VALUES
    (?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS categories;
`;