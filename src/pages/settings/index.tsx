import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/pages/settings/styles";
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/pages/newTitle/index';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { atualizarAvatar } from "@/api/endpoints";

export default function Settings() {
    const navigation = useNavigation<NavigationProp>();

    const { tema, setTema } = useTheme();

    const [showColors, setShowColors] = useState(false);
    const cores = [
        '#0097b2',
        '#60A5FA',
        '#7DD3FC',
        '#CBD5E1',
        '#2DD4BF',
        '#29b3a0',
        '#269e52',
        '#6c39bd',
        '#f49349',
        '#c46f2d',
        '#415c77',

    ];

    const escolherFoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const base64 = result.assets[0].base64;

            const res = await atualizarAvatar(`data:image/jpeg;base64,${base64}`);

            navigation.goBack();
        }
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

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                        onPress={() => setShowColors(true)}
                    >
                        <MaterialIcons name='palette' size={22} color='#f8e9e9' />
                        <Text style={styles.text}>Cor tema: </Text>
                        <View style={{
                            width: 70,
                            height: 20, borderRadius: 7,
                            backgroundColor: tema
                        }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={escolherFoto} style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name='person' size={22} color='#f8e9e9' />
                        <Text style={styles.text}>Alterar foto de perfil</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name='create' size={22} color='#f8e9e9' />
                        <Text style={styles.textUser}>Mudar nome de usuário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Ionicons name='trash' size={22} color='#fa6767' />
                        <Text style={styles.textClear}>Limpar dados</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={showColors}
                    transparent
                    animationType="fade"
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#1f2937',
                                padding: 20,
                                borderRadius: 15,
                                width: '80%'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    marginBottom: 20
                                }}
                            >
                                Escolha uma cor
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                    justifyContent: 'center'
                                }}
                            >
                                {cores.map(cor => (
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
                                                backgroundColor: cor
                                            }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </Modal>



            </SafeAreaView>
        </View>

    )
}