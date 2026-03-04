export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        creation_date TEXT NOT NULL,
        version TEXT NOT NULL,
        category_id INTEGER,

        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
`;

export const INSERT = `
    INSERT INTO tests (title, creation_date, version, category_id) VALUES
    (?, ?, ?, ?);
`;

export const UPDATE = `
    UPDATE tests
    SET title = ?, creation_date = ?, version = ?, category_id = ?
    WHERE id = ?;
`;

export const DELETE = `
    DELETE FROM tests
    WHERE id = ?;
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS tests;
`;