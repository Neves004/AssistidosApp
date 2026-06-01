import { StyleSheet } from 'react-native';
import { colors } from '@/themes/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 28,
        paddingTop: 20,
    },

    buttonArrow: {
        width: 45,
        height: 45,
        backgroundColor: colors.tema,
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
        color: colors.text,
        fontSize: 35,
        marginLeft: 20,
    },

    text: {
        color: colors.text,
        fontSize: 22,
        marginBottom: 5,
    },

    cor: {
        width: 70,
        height: 20,
        backgroundColor: colors.tema,
        borderRadius: 5,
    },

    textUser: {
        color: colors.text,
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