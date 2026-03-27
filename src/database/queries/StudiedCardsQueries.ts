export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS studied_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_id INTEGER NOT NULL,
        studied_at TEXT NOT NULL,
        is_correct BOOL NOT NULL,

        FOREIGN KEY (card_id) REFERENCES cards(id) 
    );
`;

export const INSERT = `
    INSERT INTO studied_cards (card_id, studied_at, is_correct) VALUES
    (?, ?, ?);
`;

export const DELETE = `
    DELETE FROM studied_cards
    WHERE card_id = ?;
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS studied_cards;
`;