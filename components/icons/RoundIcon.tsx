import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    name: React.ComponentProps<typeof Ionicons>['name'];
    bgColor: string;
    color: string;
};

export default function RoundIcon({ name, bgColor, color }: Props) {
    return (
        <View style={[ styles.container, { backgroundColor: bgColor } ]}>
            <Ionicons name={ name } size={ 24 } color={ color } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 25
    }
});