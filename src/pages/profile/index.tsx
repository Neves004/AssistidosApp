import React, { useEffect, useState } from "react";

import { Text, View, Image, ScrollView } from 'react-native';
import { styles } from "@/pages/profile/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { themes, User } from "@/global/themes";
import { getUser } from "@/api/auth";
import { Perfil } from "@/global/themes";
import { pegarPerfil } from "@/api/endpoints";
import { useTheme } from "@/context/ThemeContext";
import { ASSISTIDOS_API } from "@/api/assistidos";


export default function Profile() {
    const { tema } = useTheme();
    const [user, saveUser] = useState<User | null>(null);
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    //Variáveis a serem carregadas dos títulos
    const { geral, filmes, series, animes, ultimos } = perfil ?? {};

    const totalAssistidos = geral?.assistidos ?? 0;
    const generoFavoritoGeral = geral?.generoFavorito ?? '-';
    const mediaNotasGeral = geral?.mediaNotas ?? 0;

    const filmesAssistidos = filmes?.assistidos ?? 0;
    const filmesGeneroFavorito = filmes?.generoFavorito ?? '-';
    const filmesMediaNotas = filmes?.mediaNotas ?? 0;

    const seriesAssistidas = series?.assistidos ?? 0;
    const seriesGeneroFavorito = series?.generoFavorito ?? '-';
    const seriesMediaNotas = series?.mediaNotas ?? 0;

    const animesAssistidos = animes?.assistidos ?? 0;
    const animesGeneroFavorito = animes?.generoFavorito ?? '-';
    const animesMediaNotas = animes?.mediaNotas ?? 0;

    const ultimoFilme = ultimos?.filme;
    const ultimaSerie = ultimos?.serie;
    const ultimoAnime = ultimos?.anime;



    const nomeUltimoFilme = ultimoFilme?.titleName ?? 'Nenhum';
    const dataUltimoFilme = ultimoFilme?.startDate ?? '--/--/----';

    const nomeUltimaSerie = ultimaSerie?.titleName ?? 'Nenhuma';
    const dataUltimaSerie = ultimaSerie?.endDate ?? ultimaSerie?.startDate ?? '--/--/----';

    const nomeUltimoAnime = ultimoAnime?.titleName ?? 'Nenhum';
    const dataUltimoAnime = ultimoAnime?.endDate ?? ultimoAnime?.startDate ?? '--/--/----';


    const navigation = useNavigation<NavigationProp<any>>();

    //Carregar os dados
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarDados();
        });

        return unsubscribe;
    }, [navigation]);

    async function carregarDados() {
        const [useer, dados] = await Promise.all([
            getUser(),
            pegarPerfil()
        ]);

        if (useer) {
            saveUser(JSON.parse(useer) as User);
        }

        if (dados) {
            setPerfil(dados);

        }
    }


    return (

        <View style={styles.container}>

            <View style={styles.box}>

                <Image
                    source={
                        user?.avatar
                            ? { uri: `${ASSISTIDOS_API.base_url}${user.avatar}` }
                            : require('@/assets/pfp.png')
                    }
                    style={[styles.avatar, { borderColor: tema }]}
                />

                <MaterialIcons name='settings' size={35} color={tema} style={{ marginLeft: 320, marginTop: -20 }} onPress={() => navigation.navigate('Settings')} />

                <Text style={styles.user}>
                    @{user?.username
                        ? user.username.slice(0, 16) + (user.username.length > 16 ? '...' : '')
                        : ''}
                </Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <Text style={styles.title}> Última Mídia Assistida: </Text>

                    <SafeAreaView>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false} style={{ width: '95%' }}>

                            <View style={styles.titulo}>
                                <Text style={[styles.tituloH, { backgroundColor: tema }]}> FILME </Text>
                                {ultimoFilme?.image && (
                                    <Image
                                        source={{ uri: `${ASSISTIDOS_API.base_url}${ultimoFilme?.image}` }}
                                        style={styles.capa}
                                    />
                                ) || (
                                        <View style={[styles.capaNull, { backgroundColor: tema, opacity: 0.5 }]} />
                                    )}
                                <Text style={styles.tituloText}> {nomeUltimoFilme} </Text>
                                <Text style={styles.tituloText}> {dataUltimoFilme}</Text>

                            </View>

                            <View style={styles.titulo}>
                                <Text style={[styles.tituloH, { backgroundColor: tema }]}> SÉRIE </Text>
                                {ultimoFilme?.image && (
                                    <Image
                                        source={{ uri: `${ASSISTIDOS_API.base_url}${ultimaSerie?.image}` }}
                                        style={styles.capa}
                                    />
                                ) || (
                                        <View style={[styles.capaNull, { backgroundColor: tema, opacity: 0.5 }]} />
                                    )}
                                <Text style={styles.tituloText}> {nomeUltimaSerie}</Text>
                                <Text style={styles.tituloText}> {dataUltimaSerie}</Text>

                            </View>

                            <View style={styles.titulo}>
                                <Text style={[styles.tituloH, { backgroundColor: tema }]}> ANIME </Text>
                                {ultimoFilme?.image && (
                                    <Image
                                        source={{ uri: `${ASSISTIDOS_API.base_url}${ultimoAnime?.image}` }}
                                        style={styles.capa}
                                    />
                                ) || (
                                        <View style={[styles.capaNull, { backgroundColor: tema, opacity: 0.5 }]} />
                                    )}
                                <Text style={styles.tituloText}> {nomeUltimoAnime}</Text>
                                <Text style={styles.tituloText}> {dataUltimoAnime}</Text>

                            </View>
                        </ScrollView>
                    </SafeAreaView>

                    <Text style={styles.title2}> Dados: </Text>

                    <View style={styles.dados}>


                        <View>
                            <Text style={[styles.tituloD, { backgroundColor: tema }]}> Geral </Text>
                            <Text style={styles.text}> Assistidos: {totalAssistidos} </Text>
                            <Text style={styles.text}> Gênero Favorito: {generoFavoritoGeral} </Text>
                            <Text style={styles.text}> Média de Notas: {mediaNotasGeral} </Text>
                            <View style={styles.separador} />
                        </View>

                        <View>
                            <Text style={[styles.tituloD, { backgroundColor: tema }]}> Filmes </Text>
                            <Text style={styles.text}> Assistidos: {filmesAssistidos} </Text>
                            <Text style={styles.text}> Gênero Favorito: {filmesGeneroFavorito} </Text>
                            <Text style={styles.text}> Média de Notas: {filmesMediaNotas}</Text>
                            <View style={styles.separador} />
                        </View>



                        <View>
                            <Text style={[styles.tituloD, { backgroundColor: tema }]}> Séries </Text>
                            <Text style={styles.text}> Assistidos: {seriesAssistidas} </Text>
                            <Text style={styles.text}> Gênero Favorito: {seriesGeneroFavorito} </Text>
                            <Text style={styles.text}> Média de Notas: {seriesMediaNotas}</Text>
                            <View style={styles.separador} />

                        </View>

                        <View>
                            <Text style={[styles.tituloD, { backgroundColor: tema }]}> Animes </Text>
                            <Text style={styles.text}> Assistidos: {animesAssistidos} </Text>
                            <Text style={styles.text}> Gênero Favorito: {animesGeneroFavorito} </Text>
                            <Text style={styles.text}> Média de Notas: {animesMediaNotas} </Text>
                        </View>

                    </View>
                </ScrollView>
            </View>

        </View >

    )
}
