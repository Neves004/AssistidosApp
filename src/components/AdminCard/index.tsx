import { View, Text } from 'react-native';
import { styles } from './styles';

interface Props {
    title: string;
    value: number | string;
}

export function AdminCard({ title, value }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.value}>
                {value}
            </Text>
        </View>
    );
}