import AsyncStorage from "@react-native-async-storage/async-storage";

//guarda e chama o token
const key = "@assistidos:usertoken";

const getToken = async () => {
    return AsyncStorage.getItem(key);
}

const setToken = async (token: string) => {
    return AsyncStorage.setItem(key, token);
}

export { getToken, setToken };