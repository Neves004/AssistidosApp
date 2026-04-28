import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 30,
    },

    buttonArrow: {
        width: 40,
        height: 40,
        backgroundColor: '#e2e0dc',
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 70,
    },

    arrow: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // marginBottom: 'auto',
        // marginTop: 'auto',
        // color: '#6d6f73',
        // // fontSize: 25,
        // // borderRadius: 5,
        // // borderColor: '#cfccc5',
    },

    texts: {
        color: '#9ca3af',
        fontSize: 18,
        marginTop: 10,
        marginBottom: -8
    },



    capaBox: {
        flexDirection: 'row',
        columnGap: 2,
        padding: 30,

    },

    caixaCapa: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#e2e0dc',
        borderColor: '#cfccc5',
        color: '#6d6f73',
        alignSelf: 'center',
        fontSize: 15,
        padding: 9,
    },

    buttonCapa: {
        width: 80,
        height: 40,
        backgroundColor: '#e2e0dc',
        borderRadius: 5,
        marginTop: 10,
    },


    titleButtonNew: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
        color: '#6d6f73',
        fontSize: 15,
        borderRadius: 5,
        borderColor: '#cfccc5',
    },

    buttonAdd: {
        width: 130,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#0097b2',
        borderRadius: 40,
        shadowColor: "#1d034d",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    titleButtonAdd: {
        fontSize: 16,
        color: '#ffff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

})