import { Note, Category, Set } from "../../types";

export type RootStackParamList = {
    MainTabs: undefined,
    ColorPick: {
        initialColor: string,
        onSelect: (color: string) => void;
    };
    ViewCategory: {
        category?: Category;
        onGoBack?: () => void;
    } | undefined,
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
    ViewSet: {
        set: Set
    },
    ViewCard: {
        cardId?: number,
        setId?: number,
        front?: string,
        back?: string
    } | undefined,
};

export type TestsStackParamList = {
    TestsList: undefined,
    ViewTest: undefined
};