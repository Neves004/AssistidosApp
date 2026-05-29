import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { styles } from '@/pages/newTitle/styles';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerCard } from '@/components/ImagePickerCard';
import 'react-native-get-random-values';
import { CardType } from '@/components/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { TipoMidia } from '@/global/themes';
import { MediaTypeSelector } from '@/components/MediaTypeSelector';

type RootStackParamList = {

    BottomRoutes: {
        screen: string;
        params?: {
            newItem?: CardType;
        };
    };

    NewTitle: undefined;
};
type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;


export default function NewTitle() {
    const route = useRoute<any>();
    const editItem = route.params?.editItem;
    const isEditing = !!editItem;

    const [title, setTitle] = useState(editItem?.titulo || '');
    const [startDate, setStartDate] = useState(editItem?.dataInicial || '');
    const [endDate, setEndDate] = useState(editItem?.dataFinal || '');
    const [genre, setGenre] = useState(editItem?.genero || '');
    const [note, setNote] = useState(String(editItem?.nota || ''));
    const [comment, setComment] = useState(editItem?.comentario || '');
    const [image, setImage] = useState(editItem?.capa || '');
    const [type, setType] =
        useState<TipoMidia>(
            editItem?.tipo || 'Filme'
        );
    const navigation = useNavigation<NavigationProp>();

    async function pickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    function handleAdd() {
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
            type !== 'Filme' &&
            endDate.length !== 10
        ) {
            return Alert.alert(
                'Data inválida',
                'Digite a data final corretamente.'
            );
        }

        const newCard: CardType = {
            id: editItem?.id || String(Date.now()),
            capa: image,
            titulo: title,
            genero: genre,
            nota: Number(note),
            tipo: type,
            dataInicial: startDate,
            dataFinal:
                type !== 'Filme'
                    ? endDate
                    : undefined,
            comentario: comment,
        };

        navigation.navigate('BottomRoutes', {
            screen: 'Home',
            params: {
                newItem: newCard,
            },
        });
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
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 60,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                <View style={styles.container}>

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonArrow} onPress={() => navigation.goBack()}>
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
                        type === 'Filme' ? (
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

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonAdd} onPress={handleAdd} >
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
        </KeyboardAvoidingView>

    )
}