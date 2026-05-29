import { StyleSheet } from 'react-native';

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
        backgroundColor: '#0097b2',
        borderColor: '#0097b2',
    },

    text: {
        color: '#9ca3af',
        fontWeight: '600',
        fontSize:18,
    },

    textActive: {
        color: '#fff',
        
    },

});