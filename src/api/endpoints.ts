import { TipoMidia } from "@/global/themes";
import { ASSISTIDOS_API } from "./assistidos";
import { getToken } from "./auth";

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

const login = async (email: string, password: string) => {
    const endpoint = ASSISTIDOS_API.base_url + 'login';
    const res = await fetch(endpoint, {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ email: email, password: password })
    })
    const j = await res.json();
    return j;
}

const chamarTipos = async () => {
    const endpoint = ASSISTIDOS_API.base_url + 'tipos';
    const res = await fetch(endpoint, {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
    })
    if (res.ok) {
        const j = await res.json() as TipoMidia[];
        return j;
    }

    return [] as TipoMidia[];
}

const registrarTitulo = async (titleName: string, startDate: Date, endDate: Date, genre: string, note: number, comment: string, image: string, type: number) => {
    const endpoint = ASSISTIDOS_API.base_url + 'titulos';
    const res = await fetch(endpoint, {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
        'body': JSON.stringify({
            titleName: titleName, startDate: startDate, endDate: endDate, genre: genre, note: note, comment: comment, image: image, type: type
        })
    })
    const j = await res.json();
    return j;
}

const atualizarTitulo = async (id: number, titleName: string, startDate: Date, endDate: Date, genre: string, note: number, comment: string, image: string, type: number) => {
    const endpoint = ASSISTIDOS_API.base_url + 'titulos';
    const res = await fetch(endpoint, {
        'method': 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
        'body': JSON.stringify({
            id: id, titleName: titleName, startDate: startDate, endDate: endDate, genre: genre, note: note, comment: comment, image: image, type: type
        })
    })
    const j = await res.json();
    return j;
}

const pegarTitulos = async () => {
    const endpoint = ASSISTIDOS_API.base_url + 'titulos';
    const res = await fetch(endpoint, {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
    })
    if (res.ok) {
        const j = await res.json();
        return j;
    }

    return [];
}

const apagarTitulo = async (id: number) => {
    const endpoint = ASSISTIDOS_API.base_url + 'titulos/' + id;
    const res = await fetch(endpoint, {
        'method': 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
    })
    console.log(res);
    if (res.ok) {
        const j = await res.json();
        return j;
    }

    return [];
}

const pesquisarTitulo = async (titleName: string) =>{
    const endpoint = ASSISTIDOS_API.base_url + 'titulos/' + titleName;
    const res = await fetch(endpoint, {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
        },
    })
    if (res.ok) {
        const j = await res.json();
        return j;
    }

    return [];
}

//Exportando as funções
export { register, login, chamarTipos, registrarTitulo, atualizarTitulo, pegarTitulos, apagarTitulo, pesquisarTitulo }