export const NotesTagsQueries = `
    CREATE TABLE IF NOT EXISTS notes_tags (
        note_id INTEGER,
        tag_id INTEGER,

        PRIMARY KEY (note_id, tag_id),
        FOREIGN KEY (note_id) REFERENCES notes(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
    );
`;

export const INSERT = `
    INSERT INTO notes_tags VALUES
    (?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS notes_tags;
`;