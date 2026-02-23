import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import AppText from "../../../../components/AppText";

import { StackScreenProps } from "@react-navigation/stack";
import { NotesStackParamList } from "../../../navigation/types";

import FloatingActions from '../../../../components/menus/FloatingActions';
import FloatingActionsButton from '../../../../components/buttons/FloatingActionsButton';
import GradientBorderButton from "../../../../components/GradientBorderButton";

import { theme } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";

type Props = StackScreenProps<NotesStackParamList, "NotesList">;

export default function NotesList({ navigation }: Props) {
    return (
        <View style={ styles.container }>
            <FloatingActions>
                <FloatingActionsButton name='add' color={ theme.colors.text } onPress={() => navigation.navigate("ViewNote", { isReadMode: false })} />

                <GradientBorderButton onPress={() => {}} colors={ theme.colors.gradientPrimary } width={ 56 } height={ 56 }>
                    <Ionicons name="sparkles" size={ 24} />
                </GradientBorderButton>
            </FloatingActions>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.md
    }
});