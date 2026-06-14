import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { styles } from '@/pages/register/styles';
import Logo from '@/assets/logo.png';

import { MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { register } from '@/api/endpoints';

export default function Register() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [user, saveUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    async function handleRegister() {

        try {

            if (!user || !email || !password || !confirmPassword) {
                return Alert.alert('Atenção', 'Preencha todos os campos!');
            }

            if (user.trim().length < 3) {
                return Alert.alert('Nome de usuário inválido', 'O nome de usuário deve ter pelo menos 3 caracteres.');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return Alert.alert('E-mail inválido', 'Digite um endereço de e-mail válido.');
            }

            if (password.length < 6) {
                return Alert.alert('Senha inválida', 'A senha deve ter pelo menos 6 caracteres.');
            }

            if (password !== confirmPassword) {
                return Alert.alert('Atenção', 'As senhas não coincidem!');
            }

            //tratando espaços vazios e email(não tem distinção de maiúsculas e minúsculas)
            const response = await register(user.trim(), email.trim().toLowerCase(), password);

            if (response?.message) {
                Alert.alert('Sucesso', response.message);
                navigation.navigate('Login');
            }

        } catch (error: any) {
            Alert.alert(
                'Erro', error.message);
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

                <Text style={styles.text}>
                    Crie sua conta
                </Text>

                <Text style={styles.subText}>
                    Preencha os dados abaixo para continuar
                </Text>


            </View>

            <View style={styles.boxMid}>

                <Input
                    value={user}
                    onChangeText={saveUser}
                    title='NOME DE USUÁRIO:'
                    IconRight={FontAwesome}
                    IconRightName='user'
                />

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
                    IconRightName={showPassword ? 'eye-closed' : 'eye'}
                    secureTextEntry={showPassword}
                    onIconRIghtPress={() => setShowPassword(!showPassword)}
                />

                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    title='CONFIRMAR SENHA:'
                    IconRight={Octicons}
                    IconRightName={showConfirmPassword ? 'eye-closed' : 'eye'}
                    secureTextEntry={showConfirmPassword}
                    onIconRIghtPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                    }
                />

            </View>

            <View style={styles.boxBottom}>

                <Button
                    text='CRIAR CONTA'
                    onPress={() => handleRegister()}
                />

                <Text style={styles.textBottom}>
                    Já possui conta?
                    <Text
                        style={{ color: '#a839ba' }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        {' '}Entrar
                    </Text>
                </Text>

            </View>

        </View>
    )
}