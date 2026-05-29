import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Input } from "@/components/Input";
import { Feather, Octicons } from '@expo/vector-icons';
import { Card, CardType } from '@/components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { TipoMidia } from "@/global/themes";
import { useCards } from '@/context/cards.context';

// type tmdbType = {
//     poster_path: string;
// }

export default function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const { cards, deleteCard } = useCards();

    const [filterType, setFilterType] =
        useState<TipoMidia | 'Todos'>('Todos');

    const [sortBy, setSortBy] =
        useState<
            'recent' |
            'old' |
            'highest' |
            'lowest'
        >('recent');


    // async function buscarPosters(query: string) {
    //     const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODgxZTE4MWU4MDZhOTJiMjFlY2Y2NzE5ZDY2ZTBmNiIsIm5iZiI6MTc3NjI1ODAxOS44NDcwMDAxLCJzdWIiOiI2OWRmOGJlM2NjOGFhMWM1YjRiN2Y4YjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.es48orD0dJuZgdqDaLgENQvl_FAUmsGA6I83Q3BFtdc'; // Substitua pela sua chave do TMDB
    //     const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;

    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: `Bearer ${apiKey}`
    //         }

    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         if (!response.ok) {
    //             throw new Error(`Erro na requisição: ${response.status}`);
    //         }
    //         const data = await response.json();


    //         // Filtramos apenas os filmes que possuem poster e mapeamos para a URL completa
    //         const posters = (data.results as tmdbType[])
    //             .filter(movie => movie.poster_path !== null)
    //             .map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

    //         return posters;
    //     } catch (error) {
    //         console.error("Erro ao buscar filmes:", error);
    //         return [];
    //     }
    // }

    //Rota pra tela NewTitle
    type RootStackParamList = {
        BottomRoutes: undefined;
        NewTitle: {
            editItem?: CardType;
        };

    };
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    function handleDelete(id: string) {
        deleteCard(id);
    }

    function handleEdit(item: CardType) {
        navigation.navigate('NewTitle', {
            editItem: item
        });
    }

    {/* FILTROS */ }
    const filteredData = cards

        .filter((item) => {
            if (filterType === 'Todos') {
                return true;
            }
            return item.tipo === filterType;
        })

        .sort((a, b) => {
            switch (sortBy) {
                case 'highest':
                    return b.nota - a.nota;
                case 'lowest':
                    return a.nota - b.nota;
                case 'recent':
                    return (
                        new Date(
                            a.dataInicial.split('/').reverse().join('-')
                        ).getTime()
                        -
                        new Date(
                            b.dataInicial.split('/').reverse().join('-')
                        ).getTime()
                    ) * -1;

                case 'old':
                    return (
                        new Date(
                            a.dataInicial.split('/').reverse().join('-')
                        ).getTime()

                        -

                        new Date(
                            b.dataInicial.split('/').reverse().join('-')
                        ).getTime()
                    );

                default:
                    return 0;
            }
        });

    {/* FIM FILTROS */ }

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <View style={styles.initial}>
                    <Text style={styles.text}>
                        Já Assistidos
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonNew} onPress={() => navigation.navigate('NewTitle')}>
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
                    data={filteredData}
                    style={{ marginTop: 40, paddingHorizontal: 30 }}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 16 }} />
                    )}
                    renderItem={({ item }) => {
                        return (<Card card={item}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => handleEdit(item)}>
                        </Card>)
                    }}
                />
            </View>

            <Modal visible={open} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <Pressable style={{ backgroundColor: '#000a', flex: 1 }} onPress={() => setOpen(false)}></Pressable>
                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitle}>
                            Filtrar por tipo
                        </Text>

                        <View style={styles.filterRow}>

                            {
                                ['Todos', 'Filme', 'Série', 'Anime']
                                    .map((item) => (

                                        <TouchableOpacity
                                            key={item}

                                            style={[
                                                styles.filterButton,

                                                filterType === item &&
                                                styles.filterButtonActive
                                            ]}

                                            onPress={() =>
                                                setFilterType(item as any)
                                            }
                                        >

                                            <Text
                                                style={[
                                                    styles.filterText,

                                                    filterType === item &&
                                                    styles.filterTextActive
                                                ]}
                                            >
                                                {item}
                                            </Text>

                                        </TouchableOpacity>
                                    ))
                            }

                        </View>

                        <Text style={styles.modalTitle}>
                            Ordenar por
                        </Text>

                        <View style={styles.filterColumn}>

                            {/* RECENTE */}
                            <TouchableOpacity
                                style={[
                                    styles.orderButton,

                                    sortBy === 'recent' &&
                                    styles.orderButtonActive
                                ]}
                                onPress={() => setSortBy('recent')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'recent' &&
                                        styles.orderTextActive
                                    ]}
                                >
                                    Mais recente
                                </Text>
                            </TouchableOpacity>

                            {/* MENOS RECENTE */}
                            <TouchableOpacity
                                style={[
                                    styles.orderButton,

                                    sortBy === 'old' &&
                                    styles.orderButtonActive
                                ]}
                                onPress={() => setSortBy('old')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'old' &&
                                        styles.orderTextActive
                                    ]}
                                >
                                    Menos recente
                                </Text>
                            </TouchableOpacity>

                            {/* MAIOR NOTA */}
                            <TouchableOpacity
                                style={[
                                    styles.orderButton,

                                    sortBy === 'highest' &&
                                    styles.orderButtonActive
                                ]}
                                onPress={() => setSortBy('highest')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'highest' &&
                                        styles.orderTextActive
                                    ]}
                                >
                                    Maior nota
                                </Text>
                            </TouchableOpacity>

                            {/* MENOR NOTA */}
                            <TouchableOpacity
                                style={[
                                    styles.orderButton,

                                    sortBy === 'lowest' &&
                                    styles.orderButtonActive
                                ]}
                                onPress={() => setSortBy('lowest')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'lowest' &&
                                        styles.orderTextActive
                                    ]}
                                >
                                    Menor nota
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </View>


    )
}
