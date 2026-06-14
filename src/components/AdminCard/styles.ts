import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 110,
        backgroundColor: '#1f2937',
        borderRadius: 16,
        padding: 16,
        margin: 6,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#374151',
        elevation: 3,
    },

    title: {
        fontSize: 14,
        color: '#9ca3af',
    },

    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f3f4f6',
    },
});