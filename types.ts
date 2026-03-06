import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type Note = {
    id: number,
    title: string,
    content: string,
    creation_date: string
};

export type Category = {
    id: number,
    name: string,
    color: string
};

export type Set = {
    id: number,
    title: string,
    version: string,
    category_id: number
};

export type Card = {
    id: number,
    front: string,
    back: string,
    set_id: number
};

export type Test = {
    id: number,
    title: string,
    creation_date: string,
    version: string,
    category_id: number
};

export type Question = {
    id: number,
    question: string,
    right_answer_1 : string,
    right_answer_2 : string,
    right_answer_3 : string,
    right_answer_4 : string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    test_id: number
};

export type TabParamList = {
    Notes: undefined;
    Cards: undefined;
    Tests: undefined;
};

export type NotesScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Notes'>;
export type CardsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Cards'>;
export type TestsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Tests'>;