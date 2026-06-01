import { StyleSheet } from "react-native";
import { themes } from "@/global/themes";

export const styles = StyleSheet.create({
    
    button: {
        width: 170,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.tema,
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

    textButton: {
        fontSize: 16,
        color: themes.text,
        fontWeight: 'bold',
    },

})