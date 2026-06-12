import { TouchableOpacity, TouchableOpacityProps, Text, View } from "react-native";
import { styles } from "@/components/Card/styles";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { TipoMidia } from "@/global/themes";
import { Image } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { ASSISTIDOS_API } from "@/api/assistidos";

type Props = TouchableOpacityProps & {
    card: CardType;
    onDelete: () => void;
    onEdit: () => void;
}

export type CardType = {
    id: string,
    image: string,
    titleName: string,
    genre: string,
    note: number,
    startDate: string,
    endDate?: string,
    type: TipoMidia,
    comment: string,
}

export function Card({ card, onDelete, onEdit }: Props) {
    const {tema} = useTheme();

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
        } // foi eu que fiz
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
                    source={{ uri: `${ASSISTIDOS_API.base_url}${card.image}` }}
                    style={styles.capa}
                />

                {/* CONTEÚDO */}
                <View style={{ flex: 1 }}>

                    {/* topo */}
                    <View style={styles.topCard}>
                        <Text style={[styles.title, {color:tema}]}>{card.titleName}</Text>

                        <View style={[styles.typeBadge, {borderColor:tema}]}>
                            <Text style={[styles.typeText, {color:tema}]}>{card.type?.name}</Text>
                        </View>
                    </View>

                    {/* meio */}
                    <View style={styles.middleCard}>

                        <Text style={styles.genre}>{card.genre}</Text>
                        <View style={{ gap: 2, }}>
                            {/* PRIMEIRA LINHA */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    gap: 4,
                                }}
                            >
                                <Text style={styles.textCard}>
                                    {card.note}/5
                                </Text>

                                <Text style={{ color: '#fbbf24', fontSize: 14 }}>
                                    {estrelas(card.note)}
                                </Text>

                            </View>

                            {/* SEGUNDA LINHA */}
                            <Text style={styles.textData}>
                                {card.startDate} {card.endDate ? `— ${card.endDate}` : ''}
                            </Text>
                        </View>
                    </View>

                    {/* comentário */}
                    <Text style={styles.comment}>
                        {card.comment}
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