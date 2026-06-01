import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/pages/settings/styles";
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/pages/newTitle/index';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Settings() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonArrow} onPress={() => navigation.goBack()}>
                        <Ionicons
                            name='chevron-back-outline'
                            style={styles.arrow}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}> Configurações </Text>
                </View>

                <View>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name='palette' size={22} color='#f8e9e9' />
                        <Text style={styles.text}>Cor tema: </Text>
                        <View style={styles.cor} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name='person' size={22} color='#f8e9e9' />
                        <Text style={styles.text}>Alterar foto de perfil</Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <MaterialIcons name='create' size={22} color='#f8e9e9' />
                        <Text style={styles.textUser}>Mudar nome de usuário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Ionicons name='trash' size={22} color='#fa6767' />
                        <Text style={styles.textClear}>Limpar dados</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    )
}