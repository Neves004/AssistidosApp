import { StyleSheet } from 'react-native';
import { colors } from '@/themes/colors';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 130,
        backgroundColor: colors.background,
    },

    avatar: {
        marginTop: -40,
        width: 80,
        height: 80,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
        alignSelf: 'center',
    },

    box: {
        marginTop: 40,
        backgroundColor: '#091321',
        height: '88%',
        width: '95%',
        borderRadius: 10,
    },

    user: {
        color: colors.text,
        alignSelf: 'center',
        fontSize: 22,
        marginBottom: 15,
    },

    title: {
        color: colors.text,
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom: -20,
    },

    titulo: {
        height: 265,
        borderRadius: 10,
        width: 150,
        marginRight: 10,
        backgroundColor: '#17314e',
        gap: 3,
    },

    tituloH: {
        backgroundColor: colors.tema,
        width: 65,
        height: 25,
        borderRadius: 2,
        color: colors.text,
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
    },

    tituloText: {
        color: colors.text,
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 2,
    },

    title2: {
        color: colors.text,
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 15,
        marginTop: -30
    },

    dados: {
        marginLeft: 30,
    },

    tituloD: {
        backgroundColor: colors.tema,
        width: 65,
        height: 30,
        borderRadius: 2,
        color: colors.text,
        fontSize: 20,
        textAlignVertical: 'center',
        marginTop: 10,
        marginBottom:10,
    },

    text: {
        color: colors.text,
        fontSize: 18,
    },

    separador: {
        width: '100%',
        marginLeft: -20,
        height: 3,
        backgroundColor: '#1f2937',
        marginTop: 10,
        marginBottom: 10,
    },

})