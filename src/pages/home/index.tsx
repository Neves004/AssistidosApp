import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Modal, Pressable, Alert } from 'react-native';
import { styles } from '@/pages/home/styles';
import { Input } from "@/components/Input";
import { Feather, Octicons } from '@expo/vector-icons';
import { Card, CardType } from '@/components/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCards } from '@/context/cards.context';
import { getToken } from "@/api/auth";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ASSISTIDOS_API } from "@/api/assistidos";
import { pegarTitulos } from "@/api/endpoints";

export default function Home() {
    const { tema } = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const { cards, deleteCard, setCards } = useCards();

    const [query, setQuery] = useState('');

    const [filterType, setFilterType] = useState<number | 'Todos'>('Todos');

    const [sortBy, setSortBy] =
        useState<
            'recent' |
            'old' |
            'highest' |
            'lowest'
        >('recent');

    useEffect(() => {
        const timer = setTimeout(() => {
            carregarTitulos();
        }, 300);

        return () => clearTimeout(timer);
    }, [query, filterType, sortBy]);

    const pegarTitulosAquiNaPorraDaTela = () => {
        pegarTitulos().then((v) => {
            setCards(v);
        })
    }

    useEffect(() => {
        pegarTitulosAquiNaPorraDaTela();
    }, []);

    //Rota pra tela NewTitle
    type RootStackParamList = {
        BottomRoutes: undefined;
        NewTitle: {
            editItem?: CardType;
        };

    };
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    navigation.addListener('focus', () => pegarTitulosAquiNaPorraDaTela())


    async function carregarTitulos() {
        const res = await fetch(
            `${ASSISTIDOS_API.base_url}titulos?query=${query}&type=${filterType === 'Todos' ? '' : filterType}&sort=${sortBy}`,
            {
                headers: {
                    Authorization: 'Bearer ' + await getToken()
                }
            }
        );

        const data = await res.json();
        setCards(data);
    }

    function handleDelete(id: string) {
        Alert.alert('Você tem certeza de que deseja apagar?', 'Essa ação é irreversível',
            [{ 'text': 'Sim', 'onPress': () => { deleteCard(id); } },
            { 'text': 'Não' }
            ])
    }


    function handleEdit(item: CardType) {
        navigation.navigate('NewTitle', {
            editItem: item
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.boxTop}>
                <View style={styles.initial}>
                    <Text style={styles.text}>
                        Já Assistidos
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.buttonNew, { backgroundColor: tema }]} onPress={() => navigation.navigate('NewTitle' as any)}>
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
                            style={[styles.filter, { color: tema }]} />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.boxBottom}>
                <FlatList
                    data={cards}
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

                            {[
                                { id: 'Todos', label: 'Todos' },
                                { id: 1, label: 'Filme' },
                                { id: 2, label: 'Série' },
                                { id: 3, label: 'Anime' }
                            ].map((item) => (

                                <TouchableOpacity
                                    key={item.label}
                                    onPress={() => setFilterType(item.id as number | 'Todos')}
                                    style={[
                                        styles.filterButton,
                                        filterType === item.id && {
                                            backgroundColor: tema,
                                            borderColor: tema
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            filterType === item.id && styles.filterTextActive
                                        ]}
                                    >
                                        {item.label}
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
                                    { borderColor: tema, borderWidth: 1, }
                                ]}
                                onPress={() => setSortBy('recent')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'recent' &&
                                        styles.orderTextActive && { color: tema }
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
                                    { borderColor: tema, borderWidth: 1, }
                                ]}
                                onPress={() => setSortBy('old')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'old' &&
                                        styles.orderTextActive && { color: tema }
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
                                    { borderColor: tema, borderWidth: 1, }
                                ]}
                                onPress={() => setSortBy('highest')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'highest' &&
                                        styles.orderTextActive && { color: tema }
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
                                    { borderColor: tema, borderWidth: 1, }
                                ]}
                                onPress={() => setSortBy('lowest')}
                            >
                                <Text
                                    style={[
                                        styles.orderText,

                                        sortBy === 'lowest' &&
                                        styles.orderTextActive && { color: tema }
                                    ]}
                                >
                                    Menor nota
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>


    )
}
