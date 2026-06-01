import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/themes/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },

    boxTop: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
    },

    logo: {
        width: 130,
        height: 110,
    },

    text: {
        fontWeight: 'bold',
        marginTop: 6,
        fontSize: 22,
        color: '#9ca3af',
    },

    subText: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
        textAlign: 'center',
    },

    boxMid: {
        width: '100%',
        paddingHorizontal: 37,
        gap: 12,
    },

    boxBottom: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },

    textBottom: {
        fontSize: 16,
        marginTop: 14,
        color: '#9ca3af',
    },

});