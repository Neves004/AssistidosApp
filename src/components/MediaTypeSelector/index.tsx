import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from '@/components/MediaTypeSelector/styles';

import { TipoMidia } from '@/global/themes';
import { useEffect, useState } from 'react';
import { chamarTipos } from '@/api/endpoints';

type Props = {
    value: TipoMidia;
    onChange: (value: TipoMidia) => void;
}

export function MediaTypeSelector({
    value,
    onChange
}: Props) {

    const [tipos, setTipos] = useState([] as TipoMidia[]);

    useEffect(() => {
        chamarTipos().then((alface) => {
            setTipos(alface)
        })
    }, [])

    return (

        <View style={styles.container}>
            {tipos.map((tipo) => {

                return <TouchableOpacity key={tipo.id}
                    activeOpacity={0.7}
                    style={[
                        styles.button,
                        value.name === tipo.name &&
                        styles.buttonActive
                    ]}
                    onPress={() => onChange(tipo)}
                >

                    <Text
                        style={[
                            styles.text,
                            value.name === tipo.name &&
                            styles.textActive
                        ]}
                    >
                        {tipo.name}
                    </Text>
                </TouchableOpacity>
            })}



        </View>
    )
}