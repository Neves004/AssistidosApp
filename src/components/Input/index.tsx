import React, { forwardRef } from "react";

import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRIghtPress?: () => void
}

export const Input = forwardRef((Props: Props) => {
    const { IconLeft, IconRight, IconLeftName, IconRightName, title, onIconLeftPress, onIconRIghtPress, ...rest } = Props

    const calculateSizeWidth =()=>{
        if(IconLeft && IconRight){
            return '80%'
        } else if(IconLeft || IconRight){
            return '90%'
        } else{
            return '100%'
        }
    };

        const calculatePaddingLeft =()=>{
        if(IconLeft && IconRight){
            return 15;
        } else if(IconLeft || IconRight){
            return 10;
        } else{
            return 20;
        }
    };

    return (
        <>
            {title&&<Text style={styles.titleInput}>{title}</Text>}
            <View style={[
                styles.boxInput,{paddingLeft:calculatePaddingLeft()}
                ]}>

                {IconLeft && IconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={styles.button}>
                        <IconLeft name={IconLeftName as any} size={20} color={'gray'} style={styles.Icon}/>
                    </TouchableOpacity>
                )}
                <TextInput
                    style={[
                        styles.input,{width:calculateSizeWidth()}
                    ]}
                    {...rest}
                />
                {IconRight && IconRightName && (
                    <TouchableOpacity onPress={onIconRIghtPress} style={styles.button}>
                        <IconRight name={IconRightName as any} size={20} color={'gray'} style={styles.Icon}/>
                    </TouchableOpacity>
                )}
            </View >
        </>
    )
})