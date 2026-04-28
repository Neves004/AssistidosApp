import { StyleSheet, Dimensions } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 110,
        verticalAlign: 'top',
        display: 'flex',
        backgroundColor: '#1f2937',
    },

    boxTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },

    initial: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 35,
        color: '#9ca3af',
        fontFamily: 'Comic Sans MS',
    },

    buttonNew: {
        width: 45,
        height: 45,
        backgroundColor: '#0097b2',
        borderRadius: 10,
    },

    titleButtonNew: {
        fontSize: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
        color: '#ffff',
        fontWeight: 'bold',

    },

    boxMiddle: {
        //height: Dimensions.get('window').height / 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        
    },

    inputZone: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        display: 'flex',
        columnGap: 4,
    },

    filter: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
        color: '#6d6f73',
        fontSize: 25,
        borderRadius: 5,
        borderColor: '#cfccc5',
    },

    buttonFilter: {
        width: 40,
        height: 40,
        backgroundColor: '#e2e0dc',
        borderRadius: 5,
        marginTop: 10,
    },

    modal:{
        height: '80%',
        width: '100%',
    },

    boxBottom: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        display: 'flex',
        flex: 1
    },
})