import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getUsers } from '@/api/endpoints';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAvatarUrl } from '@/utils/getAvatarUrl';
import { Input } from '@/components/Input';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Feather } from '@expo/vector-icons';

export default function AdminUsers() {
    const navigation = useNavigation<any>();

    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [search, setSearch] = useState('');

    useFocusEffect(
        useCallback(() => {
            carregarUsuarios();
        }, [])
    );

    async function carregarUsuarios() {
        try {
            const data = await getUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSearch(text: string) {
        setSearch(text);

        if (!text.trim()) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter((user) => {
            const username = user.username?.toLowerCase();
            const email = user.email?.toLowerCase();
            const searchText = text.toLowerCase();

            return (
                username.includes(searchText) ||
                email.includes(searchText)
            );
        });

        setFilteredUsers(filtered);
    }

    function renderItem({ item }: any) {
        return (
            <View style={styles.card}>

                <Image
                    source={{ uri: getAvatarUrl(item.avatar) }}
                    style={styles.avatar}
                />

                <View style={styles.info}>
                    <Text style={styles.username}>
                        {item.username.length > 16
                            ? item.username.slice(0, 16) + '...'
                            : item.username}
                    </Text>

                    <Text style={styles.email}>
                        {item.email}
                    </Text>

                    <Text style={styles.date}>
                        Criado em: {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserStats', {
                        id: item.id
                    })}
                >
                    <Feather name="chevron-right" size={18} color="#f3f4f6" />
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <Text style={styles.title}>Usuários</Text>
            <Text style={styles.subtitle}>Gerencie todos os usuários do sistema</Text>

            {/* SEARCH */}
            <View style={styles.searchBox}>
                <Input
                    placeholder="Buscar por username ou email..."
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>

            {/* LIST */}
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            />

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

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#f3f4f6',
    },

    subtitle: {
        fontSize: 14,
        color: '#9ca3af',
        marginBottom: 15,
    },

    searchBox: {
        marginBottom: 10,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f2937',
        padding: 12,
        marginTop: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#374151',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 60,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#374151',
    },

    info: {
        flex: 1,
    },

    username: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#f3f4f6',
    },

    email: {
        fontSize: 12,
        color: '#9ca3af',
    },

    date: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 2,
    },

    button: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#374151',
    },
});