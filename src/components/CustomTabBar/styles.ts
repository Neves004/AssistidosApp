import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabArea:{
        flexDirection:'row',
        height:130,
        justifyContent:'space-between',
        shadowColor: '#000',
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation:7,
        paddingHorizontal: 35,

        backgroundColor: '#1f2937',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 60,
    },

    
    tabItem:{
        justifyContent:'center',
        marginBottom:20,
        alignItems:'center',
    },

    assistidos:{
        width:240,
        height:80,

    }
})
