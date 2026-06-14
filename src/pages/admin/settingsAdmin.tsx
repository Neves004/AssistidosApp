import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/auth.context';

export default function SettingsAdmin() {
    const { setUser, setSigned } = useAuth();

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();

            setUser(null);
            setSigned(false);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Configurações do Superadmin</Text>

            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    marginTop: 20,
                    backgroundColor: "red",
                    padding: 12,
                    borderRadius: 8
                }}
            >
                <Text style={{ color: "white" }}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    );
}