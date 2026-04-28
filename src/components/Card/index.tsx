import { TouchableOpacity, TouchableOpacityProps, Text, View } from "react-native";
import { styles } from "@/components/Card/styles";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { TipoMidia } from "@/global/themes";


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
    data: string, //formatado estilo iso YYYY-MM-DDT00:00:00.0000Z
    tipo: TipoMidia,
    comentario: string,
}



export function Card({ card, onDelete, onEdit }: Props) {

    async function estrelas(nota: number) {
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

    async function dataFormatada(data: string) {
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
                    <View style={styles.capa}>

                    </View>

                </View>

                <View style={{}}>

                    <View style={styles.topCard}>
                        <Text style={{ color: '#0097b2', fontSize: 20, }}>{card.titulo}</Text>
                        <Text style={{ fontStyle: 'italic', color: '#9ca3af', fontSize: 15, alignSelf: 'center' }}>{card.genero}</Text>

                    </View>

                    <View style={styles.middleCard}>
                        <Text style={styles.textCard}>{card.nota}/5 </Text>
                        <Text style={{ color: '#fbbf24', fontSize: 14 }}> {estrelas(card.nota)} </Text>
                        <Text style={styles.textCard}> {dataFormatada(card.data)} </Text>
                    </View>

                    <View style={styles.bottomCard}>
                        <Text style={styles.textCard}> {card.comentario}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}