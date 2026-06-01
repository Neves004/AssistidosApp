import { StyleSheet } from "react-native";
import { colors } from "@/themes/colors";

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 350,
        // borderColor: '#0097b2',
        borderColor: '#575c93',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        columnGap: 10,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginLeft: -12,
        gap: 10,
    },


    title: {
        color: colors.tema,
        fontSize: 20,
        fontWeight: 'bold',
    },

    genre: {
        color: '#9ca3af',
        fontStyle: 'italic',
        fontSize: 15,
        alignSelf: 'center'
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
        flex:1,
        marginTop:10
    },

    typeBadge: {
        marginLeft: 'auto',
        backgroundColor: '#0097b220',
        borderWidth: 1,
        borderColor: colors.tema,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 7,
        alignSelf: 'flex-start',
        
    },

    typeText: {
        color: colors.tema,
        fontSize: 12,
        fontWeight: '600',
    },

    middleCard: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 6,
        gap: 4,

    },

    textData: {
        color: '#9ca3af',
        fontSize: 12,
        fontStyle:'italic',
        flexShrink: 1,
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    comment: {
        color: '#9ca3af',
        fontSize: 13,
        marginTop: 6,
    },

    bottomCard: {
        flexShrink: 1,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 14,
        marginTop: 30,
        marginRight: 10,
    },
})