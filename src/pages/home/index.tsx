import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Input } from "@/components/Input";
import { Feather } from '@expo/vector-icons';
import { themes } from "@/global/themes";
import { Modal } from "@/components/Modal";


export default function Home() {
    async function newTitle() {
    }


    async function addFilter() {
    
    }

    return (
        <View style={styles.container}>

            <View style={styles.boxTop}>
                <View style={styles.initial}>
                    <Text style={styles.text}>
                        Já Assistidos
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonNew} onPress={() => newTitle()}>
                        <Text style={styles.titleButtonNew}>+</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.boxMiddle}>
                <View style={styles.inputZone}>

                    <Input 
                    titleInput="Pesquisa por títulos, gêneros, datas ou notas..." 
                    IconLeft={Feather}
                    IconLeftName="search"/>

                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonFilter} onPress={() => addFilter()}>
                        <Feather
                            name='filter'
                            style={styles.filter} />

                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.boxBottom}>


            </View>



        </View>
    )
}
