import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../../../components/AppText";
import TextButton from "../../../components/buttons/TextButton";
import AppModal from "../../../components/menus/AppModal";

import LogoIcon from "../../../assets/svg/LogoIcon";
import NameLogoIcon from "../../../assets/svg/NameLogoIcon";

import { theme } from "../../theme";

export default function SignIn() {
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
    const insets = useSafeAreaInsets();
    const [ showAbout, setShowAbout ] = useState<boolean>(false);

    return (
        <View style={ styles.container }>
            <NameLogoIcon
                width={ 150 }
                height={ 150 } />
            <TextButton text="Войти" onPress={ () => setLoggedIn(true) } onLongPress={ () => {} } />
            <TouchableOpacity 
                style={[ styles.aboutButton, { bottom: insets.bottom + theme.spacing.md } ]}
                onPress={ () => setShowAbout(true) }>
                <AppText>Справка</AppText>
            </TouchableOpacity>

            <AppModal visible={ showAbout } onPress={ () => setShowAbout(false) }>
                <AppText style={ styles.headerText }>Операционная система</AppText>
                <AppText style={ styles.blockText }>Android</AppText>
                <View>
                    <AppText>Минимум: Android 7.0+</AppText>
                    <AppText>Рекомендуется: Android 10+</AppText>
                </View>
                <AppText style={ styles.blockText }>iOS</AppText>
                <View>
                    <AppText>Минимум: iOS 13+</AppText>
                    <AppText>Рекомендуется: iOS 16+</AppText>
                </View>
                <AppText style={ styles.headerText }>Память</AppText>
                <AppText style={ styles.blockText }>Хранилище</AppText>
                <View>
                    <AppText>Минимум: 25 МБ</AppText>
                    <AppText>Рекомендуется: 30-50 МБ</AppText>
                </View>
                <AppText style={ styles.blockText }>Оперативная память</AppText>
                <View>
                    <AppText>Минимум: 2 ГБ</AppText>
                    <AppText>Рекомендуется: 4 ГБ</AppText>
                </View>
            </AppModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    aboutButton: {
        position: 'absolute',

        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md
    },

    headerText: {
        fontFamily: theme.fonts.semibold,
        fontSize: 18
    },
    blockText: {
        fontFamily: theme.fonts.semibold
    }
});