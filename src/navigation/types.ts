import { Note, Category } from "../../types";

export type RootStackParamList = {
    MainTabs: undefined,
    ColorPick: {
        initialColor: string,
        onSelect: (color: string) => void;
    };
    CreateCategory: {
        category?: Category;
        onGoBack?: () => void;
    } | undefined,
    ViewCategory: undefined
};

export type NotesStackParamList = {
    NotesList: undefined,
    ViewNote: {
        note?: Note,
        isReadMode: boolean
    },
};

export type SetsStackParamList = {
    SetsList: undefined,
    ViewSet: undefined
};