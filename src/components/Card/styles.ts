import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 350,
        borderColor: '#0097b2',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        columnGap: 10,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginLeft: -12,
    },

    textCard: {
        color: '#9ca3af',
        fontSize: 14,
        flexShrink: 1,
    },

    capa: {
        width: 100,
        height: 150,
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

    bottomCard: {
        flexShrink: 1,
    },

    actions: {
        flexDirection: 'row',
        gap: 18,
        marginTop: 14,
    },
})