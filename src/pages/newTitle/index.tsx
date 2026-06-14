import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { styles } from '@/pages/newTitle/styles';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerCard } from '@/components/ImagePickerCard';
import { CardType } from '@/components/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { TipoMidia } from '@/global/themes';
import { MediaTypeSelector } from '@/components/MediaTypeSelector';
import { v4 as uuidv4 } from 'uuid';
import { useCards } from '@/context/cards.context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { atualizarTitulo, registrarTitulo } from '@/api/endpoints';
import { useTheme } from '@/context/ThemeContext';

type RootStackParamList = {

    BottomRoutes: {
        screen: string;
        params?: {
            newItem?: CardType;
        };
    };

    NewTitle: undefined;
};
export type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;


export default function NewTitle() {
    const { tema } = useTheme();
    const route = useRoute<any>();
    const editItem = route.params?.editItem;
    const isEditing = !!editItem;

    const [title, setTitle] = useState(editItem?.titleName || '');
    const [startDate, setStartDate] = useState(editItem?.startDate || '');
    const [endDate, setEndDate] = useState(editItem?.endDate || '');
    const [genre, setGenre] = useState(editItem?.genre || '');
    const [note, setNote] = useState(editItem?.note?.toString() || '');
    const [comment, setComment] = useState(editItem?.comment || '');
    const [image, setImage] = useState(editItem?.image || '');
    const [type, setType] =
        useState<TipoMidia>(
            editItem?.tipo || { id: 1, name: 'Filme' }
        );
    const navigation = useNavigation<NavigationProp>();

    async function pickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    async function handleAdd() {
        try {
            if (!title.trim() || !startDate.trim() || !genre.trim() || !note.trim() || !comment.trim() || !image) {
                return Alert.alert(
                    'Campos obrigatórios',
                    'Preencha todos os campos antes de continuar.'
                );
            }
            if (Number(note) < 1 || Number(note) > 5) {
                return Alert.alert(
                    'Nota inválida',
                    'A nota deve ser entre 1 e 5.'
                );
            }

            if (startDate.length !== 10) {
                return Alert.alert(
                    'Data inválida',
                    'Digite a data no formato ddmmaaaa.'
                );
            }


            if (
                type.canHaveEndDate &&
                endDate &&
                endDate.length !== 10
            ) {
                return Alert.alert(
                    'Data inválida',
                    'Digite a data final corretamente.'
                );
            }

            if (endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (start.valueOf() > end.valueOf()) {
                    Alert.alert('Data inválida', 'A data final deveria ser posterior ou igual à data inicial');
                    return false;
                }
            }


            if (isEditing) {
                await atualizarTitulo(editItem.id, title, startDate, endDate, genre, note, comment, image, type.id);
            } else {
                await registrarTitulo(title, startDate, endDate, genre, note, comment, image, type.id);
            }
            navigation.goBack();

        } catch (error) {
            console.log(error);
        }

    }

    function formatDate(text: string) {

        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 2) {
            return cleaned;
        }
        if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
        >
            <SafeAreaView>

                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 60,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={styles.container}>

                        <TouchableOpacity activeOpacity={0.7} style={[styles.buttonArrow, { backgroundColor: tema }]} onPress={() => navigation.goBack()}>
                            <Ionicons
                                name='chevron-back-outline'
                                style={styles.arrow}
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>
                            {isEditing
                                ? 'Editar Título'
                                : ' Adicionar Novo Título!'
                            }

                        </Text>

                        <Text style={styles.subTitle}>
                            {isEditing
                                ? 'Atualize as informações do título'
                                : ' Salve os títulos que você assistiu'}

                        </Text>

                        <MediaTypeSelector
                            value={type}
                            onChange={setType}
                        />

                        {/* DATA ASSISTIDA (E/OU) DATA INICIAL E DATA FINAL */}

                        {
                            !type.canHaveEndDate ? (
                                <>
                                    <Text style={styles.texts}>
                                        Data Assistida:
                                    </Text>
                                    <Input
                                        titleInput="dd/mm/aaaa"
                                        value={startDate}
                                        onChangeText={(text) =>
                                            setStartDate(formatDate(text))
                                        }
                                    />
                                </>

                            ) : (

                                <>
                                    <Text style={styles.texts}>
                                        Data Inicial:
                                    </Text>
                                    <Input
                                        titleInput="dd/mm/aaaa"
                                        value={startDate}
                                        onChangeText={(text) =>
                                            setStartDate(formatDate(text))
                                        }
                                    />

                                    <Text style={styles.texts}>
                                        Data Final:
                                    </Text>
                                    <Input
                                        titleInput="dd/mm/aaaa"
                                        value={endDate}
                                        onChangeText={(text) =>
                                            setEndDate(formatDate(text))
                                        }
                                    />
                                </>
                            )
                        }

                        {/* DATA ACABA AQUI */}


                        <Text style={styles.texts}> Título: </Text>
                        <Input value={title} onChangeText={setTitle} />

                        <Text style={styles.texts}> Gênero: </Text>
                        <Input value={genre} onChangeText={setGenre} />

                        <Text style={styles.texts}> Nota (1 a 5): </Text>
                        <Input value={note} onChangeText={setNote} />

                        <Text style={styles.texts}> Comentário: </Text>
                        <Input value={comment} onChangeText={setComment} />


                        <Text style={styles.texts}> Capa do Título: </Text>

                        {/* IDEIA INICIAL - Imagens da Galeria */}
                        <View style={{ marginTop: 10, marginBottom: 15 }}>
                            <ImagePickerCard
                                image={image}
                                onPress={pickImage}
                            />

                        </View>

                        <TouchableOpacity activeOpacity={0.7} style={[styles.buttonAdd, { backgroundColor: tema }]} onPress={handleAdd} >
                            <MaterialIcons
                                name={isEditing ? 'edit' : 'add'}
                                size={22}
                                color='#fff'
                            />
                            <Text style={styles.titleButtonAdd}>
                                {isEditing
                                    ? 'Atualizar'
                                    : 'Adicionar'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView >
        </KeyboardAvoidingView>

    )
}