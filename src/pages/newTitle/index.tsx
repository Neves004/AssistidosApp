import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '@/pages/newTitle/styles';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { itemsStorage } from '@/storage/ItemStorage';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function newTitle() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [genre, setGenre] = useState('');
    const [note, setNote] = useState('');
    const [comment, setComment] = useState('');

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttonArrow} onPress={() => navigation.goBack()}>
                <Ionicons
                    name='chevron-back-outline'
                    style={styles.arrow}
                />
            </TouchableOpacity>


            <Text style={{ color: '#0097b2', fontSize: 24, paddingBottom: 20, alignSelf: 'center' }}>
                Adicionar Novo Título!
            </Text>

            <Text style={styles.texts}> Data Assistida: </Text>
            <Input titleInput="dd/mm/aaaa" value={date} onChangeText={setDate} />


            <Text style={styles.texts}> Título: </Text>
            <Input value={title} onChangeText={setTitle} />

            <Text style={styles.texts}> Gênero: </Text>
            <Input value={genre} onChangeText={setGenre} />

            <Text style={styles.texts}> Nota (1 a 5): </Text>
            <Input value={note} onChangeText={setNote} />

            <Text style={styles.texts}> Comentário: </Text>
            <Input value={comment} onChangeText={setComment} />


            <Text style={styles.texts}> Capa do Título: </Text>

            <View style={styles.capaBox}>

                <Text style={styles.caixaCapa}>
                    Nenhum arquivo selecionado..
                </Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonCapa}
                    onPress={() => { }}
                >
                    <Text style={styles.titleButtonNew}>Procurar...</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttonAdd} onPress={() => navigation.goBack()} >
                <Text style={styles.titleButtonAdd}>Adicionar</Text>
            </TouchableOpacity>
        </View>


    )
}