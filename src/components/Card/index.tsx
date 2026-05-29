import { TouchableOpacity, TouchableOpacityProps, Text, View } from "react-native";
import { styles } from "@/components/Card/styles";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { TipoMidia } from "@/global/themes";
import { Image } from 'react-native';

type Props = TouchableOpacityProps & {
    card: CardType;
    onDelete: () => void;
    onEdit: () => void;
}

export type CardType = {
    id: string,
    capa: string,
    titulo: string,
    genero: string,
    nota: number,
    dataInicial: string,
    dataFinal?: string,
    tipo: TipoMidia,
    comentario: string,
}

export function Card({ card, onDelete, onEdit }: Props) {

    function estrelas(nota: number) {
        switch (nota) {
            case 1:
                return <Text> ★✩✩✩✩ </Text>;

            case 2:
                return <Text> ★★✩✩✩ </Text>;

            case 3:
                return <Text> ★★★✩✩ </Text>;

            case 4:
                return <Text> ★★★★✩ </Text>;

            case 5:
                return <Text> ★★★★★ </Text>;

            default:
                return <Text> ✩✩✩✩✩ </Text>
        }
    }

    function dataFormatada(data: string) {
        const limitado = data.slice(0, 8);

        // Aplica a formatação
        if (limitado.length <= 2) return limitado;
        if (limitado.length <= 4)
            return `${limitado.slice(0, 2)}/${limitado.slice(2)}`;

        return `${limitado.slice(0, 2)}/${limitado.slice(2, 4)}/${limitado.slice(4)}`;

    }

        return (
            <TouchableOpacity activeOpacity={0.4}>
                <View style={styles.card}>

                    <View>
                        <Image
                            source={{ uri: card.capa }}
                            style={styles.capa}
                        />

                    </View>

                    <View style={styles.content}>

                        <View style={styles.topCard}>
                            <Text style={{ color: '#0097b2', fontSize: 20, }}>{card.titulo}</Text>
                            <Text style={{ fontStyle: 'italic', color: '#9ca3af', fontSize: 15, alignSelf: 'center' }}>{card.genero}</Text>

                        </View>
                        <View style={styles.middleCard}>
                            <Text style={styles.textCard}>{card.nota}/5 </Text>
                            <Text style={{ color: '#fbbf24', fontSize: 14 }}> {estrelas(card.nota)} </Text>
                            <Text style={styles.textCard}>
                                {
                                    card.tipo === 'Filme'
                                        ? card.dataInicial
                                        : `${card.dataInicial} - ${card.dataFinal}`
                                }
                            </Text>
                        </View>

                        <View style={styles.bottomCard}>
                            <Text style={styles.textCard}> {card.comentario}</Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onEdit}
                        >
                            <MaterialIcons
                                name="edit"
                                size={22}
                                color="#38bdf8"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onDelete}
                        >
                            <MaterialIcons
                                name="delete"
                                size={22}
                                color="#ef4444"
                            />
                        </TouchableOpacity>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }
