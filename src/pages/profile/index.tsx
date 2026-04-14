import React from "react";

import {Text, View} from 'react-native';
import { styles } from "@/pages/profile/styles";


export default function Profile(){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}> 
        <Text>
        Olá mundo profile, pessoaaaa
        </Text>
        </View>
    )
}