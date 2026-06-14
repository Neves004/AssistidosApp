import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getUserDetails, deleteAccount } from '@/api/endpoints';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAvatarUrl } from '@/utils/getAvatarUrl';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { themes } from '@/global/themes';
import { ASSISTIDOS_API } from '@/api/assistidos';
import { getToken } from '@/api/auth';

export default function UserStats({ route }: any) {
    const navigation = useNavigation<any>();
    const { id } = route.params;
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            const res = await getUserDetails(id);
            setData(res);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarConta() {
        Alert.alert(
            'Deletar conta',
            'Essa ação não pode ser desfeita. Deseja continuar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            console.log(data.user)
                            await deleteAccount(data.user.id);
                            Alert.alert('Sucesso', 'Conta deletada com sucesso');
                            navigation.goBack();

                        } catch (err) {
                            console.log(err);
                            Alert.alert('Erro', 'Não foi possível deletar conta');
                        }
                    }
                }
            ]
        );
    }

    if (!data) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loading}>Carregando usuário...</Text>
            </SafeAreaView>
        );
    }

    const ultimos = data.ultimosTitulos?.slice(0, 3) || [];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={22} color="#fff" />
                    </TouchableOpacity>

                    <Image
                        source={{ uri: getAvatarUrl(data.user.avatar) }}
                        style={styles.avatar}
                    />

                    <Text style={styles.username}>
                        {data.user.username.length > 16
                            ? data.user.username.slice(0, 16) + '...'
                            : data.user.username}
                    </Text>

                    <Text style={styles.email}>
                        {data.user.email}
                    </Text>
                </View>

                {/* STATS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Estatísticas</Text>

                    <View style={styles.row}>
                        <Text style={styles.stat}>Filmes: {data.filmes}</Text>
                        <Text style={styles.stat}>Séries: {data.series}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.stat}>Animes: {data.animes}</Text>
                        <Text style={styles.stat}>Total: {data.totalTitulos}</Text>
                    </View>
                </View>

                {/* GÊNEROS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Gêneros favoritos</Text>

                    <Text style={styles.value}>
                        Filmes: {data.generoFavoritoFilmes || 'Nenhum'}
                    </Text>

                    <Text style={styles.value}>
                        Séries: {data.generoFavoritoSeries || 'Nenhum'}
                    </Text>

                    <Text style={styles.value}>
                        Animes: {data.generoFavoritoAnimes || 'Nenhum'}
                    </Text>
                </View>

                {/* ÚLTIMOS TÍTULOS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Últimos assistidos</Text>

                    {ultimos.length === 0 ? (
                        <Text style={styles.value}>Nenhum título</Text>
                    ) : (
                        ultimos.map((t: any) => (
                            <Text key={t.id} style={styles.value}>
                                • {t.titleName}
                            </Text>
                        ))
                    )}
                </View>

                {/* DELETE ACCOUNT */}
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deletarConta}
                >
                    <Feather name="trash-2" size={18} color="#fff" />
                    <Text style={styles.deleteText}>Excluir conta</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    loading: {
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: 40,
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
    },

    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 7,
        backgroundColor: themes.tema,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: themes.tema,
        marginBottom: 10,
    },

    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f3f4f6',
    },

    email: {
        color: '#9ca3af',
    },

    inactive: {
        color: '#9ca3af',
        fontSize: 13,
        marginTop: 5,
    },

    card: {
        backgroundColor: '#1f2937',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#374151',
    },

    cardTitle: {
        color: themes.tema,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    stat: {
        color: '#d1d5db',
    },

    value: {
        color: '#9ca3af',
        marginTop: 4,
    },

    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc2626',
        padding: 14,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 40,
        gap: 10,
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});