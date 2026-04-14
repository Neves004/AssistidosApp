import { StyleSheet, Dimensions } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2937',
    },

    boxTop: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: 'red',

    },

    initial: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 80,

    },

    text: {
        fontWeight: 'bold',
        fontSize: 35,
        color: '#9ca3af',
    },

    // buttonNew: {
    //     color: '#9ca3af',
    //     fontSize: 80,

    // },

    boxMiddle: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,

    },

    boxBottom: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,

    },
})