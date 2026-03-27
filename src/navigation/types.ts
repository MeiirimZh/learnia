import { Note, Category, Set, Test } from "../../types";

export type RootStackParamList = {
    MainTabs: undefined,
    ColorPick: {
        initialColor: string,
        onSelect: (color: string) => void;
    };
    ViewCategory: {
        category?: Category;
        onGoBack?: () => void;
    } | undefined
};

export type NotesStackParamList = {
    NotesList: undefined,
    ViewNote: {
        note?: Note,
        isReadMode: boolean
    },
    GenerateNote: undefined
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
    ReviewSet: {
        set: Set | null
    },
    SelectDefinitionSet: {
        set: Set | null
    },
    MatchingSet: {
        set: Set | null
    }
};

export type TestsStackParamList = {
    TestsList: undefined,
    ViewTest: {
        test: Test
    },
    ViewQuestion: {
        questionId?: number,
        testId?: number,
        question?: string,
        is_answer_1_correct?: boolean,
        is_answer_2_correct?: boolean,
        is_answer_3_correct?: boolean,
        is_answer_4_correct?: boolean,
        answer_1?: string,
        answer_2?: string,
        answer_3?: string,
        answer_4?: string,
    } | undefined,
    TakeTest: {
        test: Test
    }
};