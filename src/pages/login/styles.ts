import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#1f2937'
    },

    boxTop: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    logo: {
        width: 140,
        height: 120,
        marginTop: 80,
    },

    text: {
        fontWeight: 'bold',
        marginTop: 4,
        fontSize: 20,
        color:'#9ca3af',
    },

    boxMid: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        paddingHorizontal: 37,
    },

    boxBottom: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
    },

    textBottom: {
        fontSize: 16,
        marginTop: 14,
        color:'#9ca3af',

    }

})
