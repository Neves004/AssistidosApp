import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Input } from "@/components/Input";
import { Feather, Octicons } from '@expo/vector-icons';
import { Card, CardType } from '@/components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { TipoMidia } from "@/global/themes";
import { useCards } from '@/context/cards.context';
import { pegarTitulos, pesquisarTitulo } from "@/api/endpoints";

// type tmdbType = {
//     poster_path: string;
// }

export default function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const { cards, deleteCard, setCards } = useCards();

    const [ query, setQuery ] = useState('');

    const [filterType, setFilterType] =
        useState<TipoMidia | 'Todos'>('Todos');

    const [sortBy, setSortBy] =
        useState<
            'recent' |
            'old' |
            'highest' |
            'lowest'
        >('recent');


    useEffect(() => {
        pegarTitulos().then((v) => {
            console.log(v);
            setCards(v);
        });
    },[]);

    useEffect(() => {
        const intervalId = setTimeout(() => {
            pesquisarTitulo(query).then((v) => {
                console.log("PESQUISADO: "+query);
                setCards(v);
            })
        }, 100);
        return () => {
            clearTimeout(intervalId);
        }
    }, [query]);



    // async function buscarPosters(query: string) {
    //     const apiKey = ; // Substitua pela sua chave do TMDB
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

    navigation.addListener('focus',() => {
        pegarTitulos().then((v) => {
            console.log(v);
            setCards(v);
        });
    })

    function handleDelete(id: string) {
        Alert.alert('Você tem certeza de que deseja apagar?', 'Essa ação é irreversível',
            [{'text':'Sim','onPress':()=> {deleteCard(id);}},
                {'text':'Não'}
            ])
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
            return item.type === filterType;
        })

        .sort((a, b) => {
            switch (sortBy) {
                case 'highest':
                    return b.note - a.note;
                case 'lowest':
                    return a.note - b.note;
                case 'recent':
                    return (
                        new Date(
                            a.startDate.split('/').reverse().join('-')
                        ).getTime()
                        -
                        new Date(
                            b.startDate.split('/').reverse().join('-')
                        ).getTime()
                    ) * -1;

                case 'old':
                    return (
                        new Date(
                            a.startDate.split('/').reverse().join('-')
                        ).getTime()

                        -

                        new Date(
                            b.startDate.split('/').reverse().join('-')
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

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonNew} onPress={() => navigation.navigate('NewTitle' as any)}>
                        <Text style={styles.titleButtonNew}>+</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.boxMiddle}>
                <View style={styles.inputZone}>

                    <Input
                        titleInput="Pesquisa por títulos, gêneros, datas ou notas..."
                        IconLeft={Octicons}
                        IconLeftName="search" 
                        value={query}
                        onChangeText={(txt) => setQuery(txt)}
                    />

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
