import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '@/components/ImagePickerCard/styles';

type Props = {
    image?: string;
    onPress: () => void;
}

export function ImagePickerCard({
    image,
    onPress
}: Props) {

    return (

        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            onPress={onPress}
        >

            <View style={styles.iconBox}>
                {
                    image ?

                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />

                        :


                        <Ionicons
                            name='image-outline'
                            size={30}
                            color='#00bcd4'
                        />

                }

            </View>
            <View style={styles.textBox}>

                <Text style={styles.title}>
                    Selecionar capa
                </Text>

                <Text style={styles.subTitle}>
                    Escolha uma imagem da galeria
                </Text>

            </View>

            <Ionicons
                name='chevron-forward'
                size={22}
                color='#9ca3af'
            />

        </TouchableOpacity>
    )
}