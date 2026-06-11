import { StyleSheet } from 'react-native';
import { themes } from "@/global/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background,
        paddingHorizontal: 28,
        paddingTop: 20,
    },

    buttonArrow: {
        width: 45,
        height: 45,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    arrow: {
        color: '#d1d5db',
        fontSize: 26,
    },

    title: {
        color: '#9ca3af',
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    subTitle: {
        color: '#6b7280',
        fontSize: 14,
        marginTop: 6,
        marginBottom: 30,
        alignSelf: 'center',
    },

    texts: {
        color: '#9ca3af',
        fontSize: 18,
        marginTop: 10,
        marginBottom: -8
    },

    capaBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },

    imagePicker: {
        width: '100%',
        height: 78,
        backgroundColor: '#111827',
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#374151',
    },

    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#1f2937',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textImageBox: {
        flex: 1,
        marginLeft: 14,
    },

    imageTitle: {
        color: '#f3f4f6',
        fontSize: 16,
        fontWeight: 'bold',
    },

    imageSubTitle: {
        color: '#9ca3af',
        fontSize: 13,
        marginTop: 2,
    },

    buttonAdd: {
        width: 150,
        height: 55,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        shadowColor: "#1d034d",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        gap: 5,
    },

    titleButtonAdd: {
        fontSize: 18,
        color: themes.text,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

})