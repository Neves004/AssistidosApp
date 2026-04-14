import React from "react";

import { Text, TouchableOpacity, View, Image } from 'react-native';
import { styles } from "@/components/CustomTabBar/styles";
import { themes } from "@/global/themes";
import Assistidos from '@/assets/assistidos.png';

import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function CustomTabBar({ state, navigation }) {

    

    const go =(screenName)=>{
        navigation.navigate('BottomRoutes', {screen: screenName})
    }

    return (
        <View style={styles.tabArea}>
            <TouchableOpacity style={styles.tabItem} onPress={()=>go('Home')}>
                <MaterialIcons
                    name='home'
                    style={{ opacity: state.index === 0 ? 1 : 0.3, color: themes.colors.personalized, fontSize: 32 }}
                />
            </TouchableOpacity>

            <View style={styles.tabItem}>
                <Image
                    source={Assistidos}
                    style={styles.assistidos}
                />

            </View>

            <TouchableOpacity style={styles.tabItem} onPress={()=>go('Profile')}>
                <FontAwesome
                    name='user'
                    style={{ opacity: state.index === 1 ? 1 : 0.3, color: themes.colors.personalized, fontSize: 32 }}

                />

            </TouchableOpacity>

        </View>
    )
}