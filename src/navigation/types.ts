import { Note } from "../../types";

export type NotesStackParamList = {
    NotesList: undefined,
    ViewNote: {
        note?: Note,
        isReadMode: boolean
    },
};