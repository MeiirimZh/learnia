import AppText from "../../../../components/AppText";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";

type Props = StackScreenProps<RootStackParamList, "ColorPick">;

export default function ColorPick({ route, navigation }: Props) {
    return (
        <AppText>Выбор цвета</AppText>
    )
}