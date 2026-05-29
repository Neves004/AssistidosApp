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

    modal: {
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

    //Modal

    modalContent: {
        backgroundColor: '#111827',
        flex: 1,
        maxHeight: '55%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: 'auto',
        padding: 24,
        marginBottom: 80
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: '#000a',
        justifyContent: 'flex-end',
    },

    modalTitle: {
        color: '#f3f4f6',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,

        marginBottom: 30,
    },

    filterButton: {
        paddingHorizontal: 18,
        height: 42,

        borderRadius: 12,

        backgroundColor: '#1f2937',

        borderWidth: 1,
        borderColor: '#374151',

        alignItems: 'center',
        justifyContent: 'center',
    },

    filterButtonActive: {
        backgroundColor: '#0097b2',
        borderColor: '#0097b2',
    },

    filterText: {
        color: '#9ca3af',
        fontWeight: '600',
    },

    filterTextActive: {
        color: '#fff',
    },

    filterColumn: {
        gap: 12,
    },

    orderButton: {
        height: 50,

        borderRadius: 14,

        backgroundColor: '#1f2937',

        justifyContent: 'center',

        paddingHorizontal: 16,
    },

    orderText: {
        color: '#f3f4f6',
        fontSize: 15,
    },

    orderButtonActive: {
        backgroundColor: '#164e63',
        borderWidth: 1,
        borderColor: '#06b6d4',
    },

    orderTextActive: {
        color: '#67e8f9',
        fontWeight: 'bold',
    },

})