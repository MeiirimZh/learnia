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

export type TabParamList = {
    Notes: undefined;
    Cards: undefined;
    Tests: undefined;
};

export type NotesScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Notes'>;
export type CardsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Cards'>;
export type TestsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Tests'>;