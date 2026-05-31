import React, { useState } from "react";

import { Text, View, Image, ScrollView } from 'react-native';
import { styles } from "@/pages/profile/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { weight } from "@expo/ui/jetpack-compose";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Profile() {
    return (

        <View style={styles.container}>


                <View style={styles.box}>


                    <Image source={require('@/assets/pfp.png')}
                        style={styles.avatar} />


                    <MaterialIcons name='settings' size={35} color='#06b6d4' style={{ marginLeft: 320, marginTop: -20 }} />

                    <Text style={styles.user}> @username </Text>


                    <Text style={styles.title}> Última Mídia Assistida: </Text>

                    <SafeAreaView>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false} style={{ width: '95%' }}>

                            <View style={styles.titulo}>
                                <Text style={styles.tituloH}> FILME </Text>
                                <View style={{ backgroundColor: 'lightblue', height: 150, width: 100, alignSelf: 'center', marginTop: 10 }}> </View>
                                <Text style={styles.tituloText}> nome-titulo-assistido</Text>
                                <Text style={styles.tituloText}> (**/**/****)</Text>

                            </View>

                            <View style={styles.titulo}>
                                <Text style={styles.tituloH}> SÉRIE: </Text>
                                <View style={{ backgroundColor: 'lightblue', height: 150, width: 100, alignSelf: 'center', marginTop: 10 }}> </View>
                                <Text style={styles.tituloText}> nome-titulo-assistido</Text>
                                <Text style={styles.tituloText}> (**/**/****)</Text>

                            </View>

                            <View style={styles.titulo}>
                                <Text style={styles.tituloH}> ANIME: </Text>
                                <View style={{ backgroundColor: 'lightblue', height: 150, width: 100, alignSelf: 'center', marginTop: 10 }}> </View>
                                <Text style={styles.tituloText}> nome-titulo-assistido</Text>
                                <Text style={styles.tituloText}> (**/**/****)</Text>

                            </View>
                        </ScrollView>
                    </SafeAreaView>

                    <Text style={styles.title2}> Dados: </Text>

                    <View style={styles.dados}>

                        <View style={{ flexDirection: 'row', gap: 50 }}>

                        <View>
                            <Text style={styles.text}> Geral </Text>
                            <Text style={styles.text}> Assistidos: </Text>
                            <Text style={styles.text}> Gênero Favorito: </Text>
                            <Text style={styles.text}> Média de Notas: </Text>
                            <View style={styles.separador}> </View>
                        </View>

                        <View>
                            <Text style={styles.text}> Filmes </Text>
                            <Text style={styles.text}> Assistidos: </Text>
                            <Text style={styles.text}> Gênero Favorito: </Text>
                            <Text style={styles.text}> Média de Notas: </Text>
                            <View style={styles.separador}> </View>
                        </View>

                        </View>


                        <View style={{ flexDirection: 'row', gap: 50 }}>
                        <View>
                            <Text style={styles.text}> Séries </Text>
                            <Text style={styles.text}> Assistidos: </Text>
                            <Text style={styles.text}> Gênero Favorito: </Text>
                            <Text style={styles.text}> Média de Notas: </Text>
                        </View>

                        <View>
                            <Text style={styles.text}> Animes </Text>
                            <Text style={styles.text}> Assistidos: </Text>
                            <Text style={styles.text}> Gênero Favorito: </Text>
                            <Text style={styles.text}> Média de Notas: </Text>
                        </View>
                        </View>

                    </View>

                </View>


        </View >

    )
}
