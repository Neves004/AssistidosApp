import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 90,
        backgroundColor: '#111827',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#374151',
    },

    iconBox: {
        width: 55,
        height: 80,
        borderRadius: 14,
        backgroundColor: '#1f2937',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    image: {
        width: "100%",
        height: "100%",
        borderRadius: 14,
        resizeMode: 'cover',
    },

    textBox: {
        flex: 1,
        marginLeft: 18,
        justifyContent: 'center',
    },

    title: {
        color: '#f3f4f6',
        fontSize: 16,
        fontWeight: 'bold',
    },

    subTitle: {
        color: '#9ca3af',
        fontSize: 13,
        marginTop: 3,
    },

});