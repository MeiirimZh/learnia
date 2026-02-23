import { PropsWithChildren } from "react";
import { StyleSheet, Modal, View, Pressable } from "react-native";
import { theme } from "../../src/theme";

type Props = PropsWithChildren<{
    visible: boolean,
    onPress: () => void
}>;

export default function AppModal({ visible, onPress, children }: Props) {
    return (
        <Modal
            visible={ visible }
            transparent
            animationType="fade">
            <Pressable
                style={ styles.overlay }
                onPress={ onPress } >
                <View style={ styles.modalContent }>
                    { children }
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'hsla(0, 0%, 0%, 0.4)',
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        gap: theme.spacing.md,
        width: "80%",
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.bg,
        borderRadius: 10
    }
});