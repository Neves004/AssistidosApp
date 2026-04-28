import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 350,
        borderColor: '#1800ad',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        columnGap: 10,
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginLeft:-12,
    },

    textCard: {
        color: '#9ca3af',
        fontSize: 14,
        flexShrink: 1,
    },

    capa: {
        width: 100,
        height: 150,
        backgroundColor: 'red',
        borderRadius: 5,
    },

    topCard: {
        flexDirection: 'row',
        display: 'flex',
        columnGap: 5,
        flexShrink: 1,
    },

    middleCard: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomCard:{
        flexShrink:1,
    },
})