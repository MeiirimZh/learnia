export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        creation_date TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO notes (title, content, creation_date) VALUES
    (?, ?, ?);
`;

export const UPDATE = `
    UPDATE notes
    SET title = ?, content = ?, creation_date = ?
    WHERE id = ?;
`;

export const UPDATE_TITLE = `
    UPDATE notes
    SET title = ?
    WHERE id = ?;
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS notes;
`;