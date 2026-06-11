import AsyncStorage from "@react-native-async-storage/async-storage";

//guarda e chama o token
const tokenKey = "@assistidos:usertoken";
const userKey = "@assistidos:user";

const getToken = async () => {
    return AsyncStorage.getItem(tokenKey);
}

const setToken = async (token: string) => {
    return AsyncStorage.setItem(tokenKey, token);
}

const getUser = async () => {
    return AsyncStorage.getItem(userKey);
}

const setUser = async (user: string) => {
    return AsyncStorage.setItem(userKey, user)
}

const saveTheme = async (theme: string) => {
    await AsyncStorage.setItem('@theme', theme);
}

const getTheme = async () => {
    return await AsyncStorage.getItem('@theme');
}

export { getToken, setToken, getUser, setUser, saveTheme, getTheme };