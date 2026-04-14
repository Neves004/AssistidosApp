import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Button } from "@/components/Button";

export default function Home() {
    async function newTitle() {

//        fetch()
    }

    return (
        <View style={styles.container}>

            <View style={styles.boxTop}>
                <View style={styles.initial}>
                    <Text style={styles.text}>
                        Último Assistidos
                    </Text>

                    <Button text='+' onPress={() => newTitle()} />

                </View>

            </View>

            <View style={styles.boxMiddle}>


            </View>

            <View style={styles.boxBottom}>


            </View>



        </View>
    )
}
