import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { getDashboard, getTopUsuarios } from '@/api/endpoints';
import { AdminCard } from '@/components/AdminCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState<any>(null);
    const [topUsers, setTopUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarDashboard();
    }, []);

    async function carregarDashboard() {
        try {
            const dashboardData = await getDashboard();
            setDashboard(dashboardData);

            const ranking = await getTopUsuarios();
            setTopUsers(ranking);

        } catch (error) {
            console.log('Erro dashboard:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loading}>Carregando dashboard...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <Text style={styles.pageTitle}>Dashboard</Text>
                <Text style={styles.subtitle}>Visão geral do sistema</Text>

                {/* STATS */}
                <Text style={styles.sectionTitle}>Estatísticas gerais</Text>

                <View style={styles.row}>
                    <AdminCard title="Usuários" value={dashboard?.usuarios ?? 0} />
                    <AdminCard title="Títulos" value={dashboard?.titulos ?? 0} />
                </View>

                <View style={styles.row}>
                    <AdminCard title="Filmes" value={dashboard?.filmes ?? 0} />
                    <AdminCard title="Séries" value={dashboard?.series ?? 0} />
                    <AdminCard title="Animes" value={dashboard?.animes ?? 0} />
                </View>

                {/* PREFERÊNCIAS */}
                <Text style={styles.sectionTitle}>Preferências da comunidade</Text>

                <View style={styles.row}>
                    <AdminCard title="Gênero favorito" value={dashboard?.generoFavorito ?? '-'} />
                    <AdminCard title="Tipo favorito" value={dashboard?.tipoFavorito ?? '-'} />
                </View>

                {/* TOP USERS */}
                <Text style={styles.sectionTitle}>Top usuários</Text>

                <View style={styles.rankingCard}>

                    {topUsers.map((user, index) => (
                        <View key={user.id} style={styles.userRow}>

                            <View style={styles.positionBox}>
                                <Text style={styles.position}>
                                    #{index + 1}
                                </Text>
                            </View>

                            <View style={styles.userInfo}>
                                <Text style={styles.username}>
                                    {user.username.length > 16
                                        ? user.username.slice(0, 16) + '...'
                                        : user.username}
                                </Text>

                                <Text style={styles.sub}>
                                    {user.totalTitulos} títulos
                                </Text>
                            </View>

                            <Feather name="chevron-right" size={18} color="#9ca3af" />

                        </View>
                    ))}

                </View>

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
        fontSize: 16,
    },

    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f3f4f6',
    },

    subtitle: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f3f4f6',
        marginTop: 18,
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    rankingCard: {
        backgroundColor: '#1f2937',
        borderRadius: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#374151',
        marginBottom: 30,
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },

    positionBox: {
        width: 40,
        alignItems: 'center',
    },

    position: {
        color: '#f3f4f6',
        fontWeight: 'bold',
    },

    userInfo: {
        flex: 1,
    },

    username: {
        color: '#f3f4f6',
        fontWeight: '600',
    },

    sub: {
        color: '#9ca3af',
        fontSize: 12,
        marginTop: 2,
    },
});