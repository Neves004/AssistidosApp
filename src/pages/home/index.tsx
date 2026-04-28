import React, { useState, useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Input } from "@/components/Input";
import { Feather, Octicons } from '@expo/vector-icons';
import { themes } from "@/global/themes";
import { Card, CardType } from '@/components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useFocusEffect } from '@react-navigation/native';
import { itemsStorage } from "@/storage/ItemStorage";


type tmdbType = {
    poster_path: string;
}

export default function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState([]);


    async function buscarPosters(query: string) {
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODgxZTE4MWU4MDZhOTJiMjFlY2Y2NzE5ZDY2ZTBmNiIsIm5iZiI6MTc3NjI1ODAxOS44NDcwMDAxLCJzdWIiOiI2OWRmOGJlM2NjOGFhMWM1YjRiN2Y4YjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.es48orD0dJuZgdqDaLgENQvl_FAUmsGA6I83Q3BFtdc'; // Substitua pela sua chave do TMDB
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }

        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();


            // Filtramos apenas os filmes que possuem poster e mapeamos para a URL completa
            const posters = (data.results as tmdbType[])
                .filter(movie => movie.poster_path !== null)
                .map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

            return posters;
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
            return [];
        }
    }

    //Rota pra tela newTitle
    type RootStackParamList = {
        BottomRoutes: undefined;
        newTitle: undefined;
    };

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <View style={styles.initial}>
                    <Text style={styles.text}>
                        Já Assistidos
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonNew} onPress={() => navigation.navigate('newTitle')}>
                        <Text style={styles.titleButtonNew}>+</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.boxMiddle}>
                <View style={styles.inputZone}>

                    <Input
                        titleInput="Pesquisa por títulos, gêneros, datas ou notas..."
                        IconLeft={Octicons}
                        IconLeftName="search" />

                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonFilter} onPress={() => setOpen(!open)}>
                        <Feather
                            name='filter'
                            style={styles.filter} />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.boxBottom}>
                <FlatList
                    data={data}
                    style={{ marginTop: 40, paddingHorizontal: 30 }}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => {
                        return (<Card card={item} onDelete={() => { }} onEdit={() => { }}></Card>)
                    }}
                />


            </View>

            <Modal visible={open} style={{ backgroundColor: '#000a' }} transparent animationType="fade">
                <Pressable style={{ backgroundColor: '#000a', flex: 1 }} onPress={() => setOpen(false)}>
                    <View style={{ backgroundColor: '#fff', flex: 1, maxHeight: '50%', borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: 'auto' }}>

                    </View>
                </Pressable>

            </Modal>


        </View>


    )
}
