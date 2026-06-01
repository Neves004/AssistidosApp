import { StyleSheet } from 'react-native';
import { themes } from "@/global/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background,
        paddingHorizontal: 28,
        paddingTop: 20,
    },

    buttonArrow: {
        width: 45,
        height: 45,
        backgroundColor: themes.tema,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    arrow: {
        color: '#d1d5db',
        fontSize: 26,
    },

    title: {
        color: themes.text,
        fontSize: 35,
        marginLeft: 20,
    },

    text: {
        color: themes.text,
        fontSize: 22,
        marginBottom: 5,
    },

    cor: {
        width: 70,
        height: 20,
        backgroundColor: themes.tema,
        borderRadius: 5,
    },

    textUser: {
        color: themes.text,
        fontSize: 22,
        marginBottom: 5,
        textDecorationLine: 'underline'
    },

    textClear: {
        color: '#fa6767',
        fontSize: 22,
        marginBottom: 5,
        textDecorationLine: 'underline'


    },
})