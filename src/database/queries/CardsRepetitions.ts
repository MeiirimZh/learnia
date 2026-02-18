export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS cards_repetitions (
        card_id INTEGER,
        repetition_id INTEGER,

        PRIMARY KEY (card_id, repetition_id),
        FOREIGN KEY (card_id) REFERENCES cards(id),
        FOREIGN KEY (repetition_id) REFERENCES repetitions(id)
    );
`;

export const INSERT = `
    INSERT INTO cards_repetitions VALUES
    (?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS cards_repetitions;
`;