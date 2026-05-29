import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from '@/components/MediaTypeSelector/styles';

import { TipoMidia } from '@/global/themes';

type Props = {
    value: TipoMidia;
    onChange: (value: TipoMidia) => void;
}

export function MediaTypeSelector({
    value,
    onChange
}: Props) {

    return (

        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.button,
                    value === 'Filme' &&
                    styles.buttonActive
                ]}
                onPress={() => onChange('Filme')}
            >

                <Text
                    style={[
                        styles.text,
                        value === 'Filme' &&
                        styles.textActive
                    ]}
                >
                    Filme
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.button,
                    value === 'Série' &&
                    styles.buttonActive
                ]}
                onPress={() => onChange('Série')}
            >

                <Text
                    style={[
                        styles.text,
                        value === 'Série' &&
                        styles.textActive
                    ]}
                >
                    Série
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.button,
                    value === 'Anime' &&
                    styles.buttonActive
                ]}
                onPress={() => onChange('Anime')}
            >

                <Text
                    style={[
                        styles.text,
                        value === 'Anime' &&
                        styles.textActive
                    ]}
                >
                    Anime
                </Text>

            </TouchableOpacity>

        </View>
    )
}