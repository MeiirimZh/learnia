export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO tags (name) VALUES
    (?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS tags;
`;