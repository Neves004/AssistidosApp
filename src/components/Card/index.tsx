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

                {/* CAPA */}
                <Image
                    source={{ uri: card.capa }}
                    style={styles.capa}
                />

                {/* CONTEÚDO */}
                <View>

                    {/* topo */}
                    <View style={styles.topCard}>
                        <Text style={styles.title}>{card.titulo}</Text>
                        <Text style={styles.genre}>{card.genero}</Text>

                        <View style={styles.typeBadge}>
                            <Text style={styles.typeText}>{card.tipo}</Text>
                        </View>
                    </View>

                    {/* meio */}
                    <View style={styles.middleCard}>

                        <View
                            style={{
                                alignItems: 'flex-start',
                                gap: 2,
                            }}
                        >

                            {/* PRIMEIRA LINHA */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <Text style={styles.textCard}>
                                    {card.nota}/5
                                </Text>

                                <Text style={{ color: '#fbbf24', fontSize: 14 }}>
                                    {estrelas(card.nota)}
                                </Text>

                                <Text style={styles.textCard}>
                                    {card.dataInicial}
                                </Text>
                            </View>

                            {/* SEGUNDA LINHA */}
                            {card.dataFinal && (
                                <Text style={styles.textCard}>
                                    Fim: {card.dataFinal}
                                </Text>
                            )}

                        </View>

                    </View>

                    {/* comentário */}
                    <Text style={styles.comment}>
                        {card.comentario}
                    </Text>

                    {/* ações */}
                    <View style={styles.actions}>

                        <TouchableOpacity onPress={onEdit}>
                            <MaterialIcons
                                name="edit"
                                size={20}
                                color="#38bdf8"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onDelete}>
                            <MaterialIcons
                                name="delete"
                                size={20}
                                color="#ef4444"
                            />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </TouchableOpacity>
    );
}