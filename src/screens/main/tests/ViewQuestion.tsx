import { StackScreenProps } from "@react-navigation/stack";
import { TestsStackParamList } from "../../../navigation/types";

import { View } from "react-native";

type Props = StackScreenProps<TestsStackParamList, "ViewQuestion">;

export default function ViewQuestion({ navigation, route }: Props) {
    const testId = route.params?.testId ?? null;

    return (
        <View>

        </View>
    )
}