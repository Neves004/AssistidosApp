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

    sessao: {
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 25,
        marginBottom: 10,
        textTransform: 'uppercase',
    },

    separador: {
        height: 1,
        backgroundColor: '#2d3645',
        marginTop:15,
    },

    text: {
        color: themes.text,
        fontSize: 22,
        marginBottom: 5,
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