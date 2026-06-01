import { StyleSheet } from 'react-native';
import { colors } from '@/themes/colors';

export const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
    },

    button: {
        flex: 1,
        height: 45,
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#374151',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonActive: {
        backgroundColor: colors.tema,
        borderColor: colors.tema,
    },

    text: {
        color: '#9ca3af',
        fontWeight: '600',
        fontSize:18,
    },

    textActive: {
        color: colors.text,
        
    },

});