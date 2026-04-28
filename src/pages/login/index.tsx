import React, { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { styles } from '@/pages/login/styles';
import Logo from '@/assets/logo.png';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useNavigation , NavigationProp} from '@react-navigation/native'

export default function Login() {
    
    const navigation = useNavigation<NavigationProp<any>>();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    async function getLogin() {
        try {
            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!')
            }

            navigation.reset({routes:[{name:"BottomRoutes"}]})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={styles.text}> Bem-Vindo de Volta!!!</Text>
            </View>

            <View style={styles.boxMid}>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    title='ENDEREÇO DE E-MAIL:'
                    IconRight={MaterialIcons}
                    IconRightName='email'
                />

                <Input
                    value={password}
                    onChangeText={setPassword}
                    title='SENHA:'
                    IconRight={Octicons}
                    IconRightName={showPassword ? 'eye-closed' : "eye"}
                    secureTextEntry={showPassword}
                    onIconRIghtPress={() => setShowPassword(!showPassword)}
                />

            </View>

            <View style={styles.boxBottom}>
                <Button text='ENTRAR' onPress={()=>getLogin()}
                />

                <Text style={styles.textBottom}> Não tem conta? <Text style={{ color: '#a839ba' }}> Crie aqui </Text> </Text>

            </View>
        </View>
    )
}