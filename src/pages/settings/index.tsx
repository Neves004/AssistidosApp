import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/pages/settings/styles";
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/pages/newTitle/index';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

import * as ImagePicker from 'expo-image-picker';
import { atualizarAvatar, atualizarUsername, limparDados } from "@/api/endpoints";
import { getUser, saveUser, setToken, logout } from "@/api/auth";
import { AppModal } from "@/components/AppModal";
import { Alert, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/auth.context';

export default function Settings() {
    const navigation = useNavigation<NavigationProp>();
    const { setSigned } = useAuth();
    const { tema, setTema } = useTheme();

    const [showColors, setShowColors] = useState(false);
    const cores = [
        '#0097b2',
        '#29b3a0',
        '#269e52',
        '#60A5FA',
        '#6c39bd',
        '#c46f2d',
        '#415c77',

    ];

    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const escolherFoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const imageUri = result.assets[0].uri;

            const formData = new FormData();

            formData.append('image', {
                uri: imageUri,
                name: 'avatar.jpg',
                type: 'image/jpeg',
            } as any);

            const res = await atualizarAvatar(formData);

            if (res?.avatar) {
                const userString = await getUser();

                if (userString) {
                    const user = JSON.parse(userString);
                    user.avatar = res.avatar;
                    await saveUser(JSON.stringify(user));
                }
            }

            navigation.goBack();
        }
    };

    const alterarNome = async () => {
        try {
            if (!newUsername.trim()) {
                return Alert.alert(
                    'Atenção',
                    'Digite um nome de usuário'
                );
            }

            const res = await atualizarUsername(
                newUsername.trim()
            );

            const userString = await getUser();

            if (userString) {
                const user = JSON.parse(userString);

                user.username = newUsername.trim();

                await saveUser(JSON.stringify(user));
            }

            Alert.alert(
                'Sucesso',
                res.message
            );

            setShowUsernameModal(false);

            navigation.goBack();

        } catch (error: any) {
            Alert.alert(
                'Erro',
                error.message
            );
        }
    };

    const apagarTudo = async () => {
        try {
            const res = await limparDados();

            Alert.alert(
                'Dados removidos',
                'Todos os filmes, séries, animes, estatísticas e histórico foram apagados com sucesso.'
            );
            setShowDeleteModal(false);

        } catch (error: any) {
            Alert.alert(
                'Erro',
                error.message
            );
        }
    };

    const sairDaConta = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');

        await setToken('');
        await saveUser('');

        setSigned(false);
    };


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.buttonArrow, { backgroundColor: tema }]} onPress={() => navigation.goBack()}>
                        <Ionicons
                            name='chevron-back-outline'
                            style={styles.arrow}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}> Configurações </Text>
                </View>

                <View>

                    <Text style={[styles.sessao, { color: tema }]}>Conta</Text>

                    <View style={{
                        backgroundColor: '#1f2937',
                        borderRadius: 15,
                        overflow: 'hidden',
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                            onPress={escolherFoto}>
                            <MaterialIcons name='person' size={22} color='#f8e9e9' />
                            <Text style={styles.text}>Alterar foto de perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                            onPress={() => setShowUsernameModal(true)}>
                            <MaterialIcons name='create' size={22} color='#f8e9e9' />
                            <Text style={styles.textUser}>Mudar nome de usuário</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                            onPress={sairDaConta}>
                            <MaterialIcons name="logout" size={22} color={tema} />
                            <Text style={styles.text}>Sair da Conta</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separador} />


                    <Text style={[styles.sessao, { color: tema }]}>Aplicativo </Text>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                        onPress={() => setShowColors(true)}>
                        <MaterialIcons name='palette' size={22} color='#f8e9e9' />
                        <Text style={styles.text}>Cor tema: </Text>
                        <View style={{
                            width: 70,
                            height: 20, borderRadius: 7,
                            backgroundColor: tema
                        }} />
                    </TouchableOpacity>

                    <View style={styles.separador} />

                    <Text style={[styles.sessao, { color: tema }]}>Dados</Text>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => setShowDeleteModal(true)}>
                        <Ionicons name='trash' size={22} color='#fa6767' />
                        <Text style={styles.textClear}>Limpar dados</Text>
                    </TouchableOpacity>
                </View>

                {/* MODAIS AQUI */}

                <AppModal
                    visible={showColors}
                    title="Escolha uma cor"
                    onClose={() => setShowColors(false)}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 10,
                            justifyContent: 'center'
                        }}
                    >
                        {cores.map(cor => {
                            const selecionada = cor === tema;

                            return (
                                <TouchableOpacity
                                    key={cor}
                                    onPress={() => {
                                        setTema(cor);
                                        setShowColors(false);
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: cor,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: selecionada ? 1.5 : 0,
                                            borderColor: '#fff',
                                        }}
                                    >
                                        {selecionada && (
                                            <Ionicons
                                                name="checkmark"
                                                size={24}
                                                color="#fff"
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </AppModal>

                <AppModal
                    visible={showUsernameModal}
                    title="Alterar nome de usuário"
                    onClose={() => {
                        setShowUsernameModal(false);
                        setNewUsername('');
                    }}>

                    <TextInput
                        value={newUsername}
                        onChangeText={setNewUsername}
                        placeholder="Digite o novo nome"
                        placeholderTextColor="#9ca3af"
                        style={{
                            backgroundColor: '#374151',
                            color: '#fff',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginBottom: 20,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setShowUsernameModal(false);
                                setNewUsername('');
                            }}
                        >
                            <Text
                                style={{
                                    color: '#ef4444',
                                    fontWeight: '600',
                                }}
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={alterarNome}
                        >
                            <Text
                                style={{
                                    color: tema,
                                    fontWeight: '600',
                                }}
                            >
                                Salvar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </AppModal>

                <AppModal
                    visible={showDeleteModal}
                    title=""
                    onClose={() => setShowDeleteModal(false)}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 5,
                            marginTop: -50,
                        }}
                    >
                        <Ionicons
                            name="warning-outline"
                            size={50}
                            color="#ef4444"
                        />
                    </View>

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 10,
                        }}
                    >
                        Limpar Dados
                    </Text>

                    <Text
                        style={{
                            color: '#ef4444',
                            fontWeight: 'bold',
                            marginBottom: 10,
                            textAlign: 'center'

                        }}
                    >
                        Essa ação não pode ser desfeita.
                    </Text>
                    <Text
                        style={{
                            color: '#fff',
                            marginBottom: 5,
                            lineHeight: 22,
                            textAlign: 'center'
                        }}
                    >
                        Os itens abaixo serão removidos:
                    </Text>

                    <View
                        style={{
                            backgroundColor: '#374151',
                            borderRadius: 10,
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: '#d1d5db',
                                lineHeight: 24,
                                textAlign: 'center',
                            }}
                        >
                            Todas as Mídias Assistidas,{'\n'}
                            Estatísticas e Histórico.
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setShowDeleteModal(false)}
                        >
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontWeight: '600',
                                }}
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={apagarTudo}
                        >
                            <Text
                                style={{
                                    color: '#ef4444',
                                    fontWeight: 'bold',
                                }}
                            >
                                Apagar Tudo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </AppModal>


            </SafeAreaView>
        </View >

    )
}