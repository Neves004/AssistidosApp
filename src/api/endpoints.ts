import { ASSISTIDOS_API } from "./assistidos";

// Função Wrapper (envolve) para registrar usuários
const register = async (user: string, email: string, password: string) => {
    const endpoint = ASSISTIDOS_API.base_url + 'register';

    const res = await fetch(endpoint, {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ username: user, email: email, password: password })
    });
    const j = await res.json();
    return j;
}

const login = async (email:string, password:string) =>{
    const endpoint = ASSISTIDOS_API.base_url + 'login';
    const res = await fetch(endpoint,{
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body':  JSON.stringify({ email: email, password: password })
    })
    const j = await res.json();
    return j;
}


//Exportando as funções
export {register, login,}