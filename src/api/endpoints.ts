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

    if (!res.ok) {
        throw new Error(j.message);
    }
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

    if (!res.ok) {
        throw new Error(j.message);
    }
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

async function registrarTitulo(titleName: string, startDate: string, endDate: string, genre: string, note: string, comment: string, image: string, type: number) {
    const formData = new FormData();

    formData.append('titleName', titleName);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('genre', genre);
    formData.append('note', note);
    formData.append('comment', comment);
    formData.append('type', String(type));

    formData.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
    } as any);

    const endpoint = ASSISTIDOS_API.base_url + 'titulos';

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + await getToken(),
        },
        body: formData,
    });

    const j = await res.json();
    return j;
}

const atualizarTitulo = async (id: number, titleName: string, startDate: string, endDate: string, genre: string, note: number, comment: string, image: string, type: number) => {
    const formData = new FormData();

    formData.append('id', String(id));
    formData.append('titleName', titleName);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('genre', genre);
    formData.append('note', String(note));
    formData.append('comment', comment);
    formData.append('type', String(type));

    if (image && image.startsWith('file')) {
        formData.append('image', {
            uri: image,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);
    }

    const endpoint = ASSISTIDOS_API.base_url + 'titulos';

    const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + await getToken(),
            // ❌ NÃO colocar Content-Type
        },
        body: formData,
    });

    return await res.json();
};

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

const pesquisarTitulo = async (titleName: string) => {
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

const pegarPerfil = async () => {
    const endpoint = ASSISTIDOS_API.base_url + 'perfil';

    const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken(),
        },
    });

    if (res.ok) {
        const j = await res.json();
        return j;
    }

    return null;
}

const atualizarAvatar = async (formData: FormData) => {
    const endpoint = ASSISTIDOS_API.base_url + 'user/avatar';

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + await getToken(),
        },
        body: formData,
    });

    return await res.json();
};

const atualizarUsername = async (username: string) => {
    const endpoint = ASSISTIDOS_API.base_url + 'user';

    const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + await getToken(),
        },
        body: JSON.stringify({
            username
        }),
    });

    const j = await res.json();

    if (!res.ok) {
        throw new Error(j.message);
    }

    return j;

}

async function limparDados() {
    const endpoint = ASSISTIDOS_API.base_url + 'titulos';
    const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + await getToken(),
        },
    });

    const text = await res.text();

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message);
    }
    return json;
}

//Exportando as funções
export {
    register, login, chamarTipos, registrarTitulo, atualizarTitulo, pegarTitulos, apagarTitulo, pesquisarTitulo, pegarPerfil,
    atualizarAvatar, atualizarUsername, limparDados
}