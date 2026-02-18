export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        front TEXT NOT NULL,
        back TEXT NOT NULL,
        set_id INTEGER,

        FOREIGN KEY (set_id) REFERENCES sets(id)
    );
`;

export const INSERT = `
    INSERT INTO cards (front, back, set_id) VALUES
    (?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF NOT EXISTS cards;
`;