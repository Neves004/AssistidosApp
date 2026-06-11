export const themes = {
        background: '#1f2937',
        secundary: '#17314e',
        text: '#fff',
        tema: '#0097b2',
}

export type TipoMidia = {
        id: number;
        name: string;
        canHaveEndDate: boolean;
}

export type User = {
        id: number;
        username: string;
        email: string;
        avatar?: string;
}

export type Perfil = {
        geral: {
                assistidos: number;
                generoFavorito: string;
                mediaNotas: number;
        };

        filmes: {
                assistidos: number;
                generoFavorito: string;
                mediaNotas: number;
        };

        series: {
                assistidos: number;
                generoFavorito: string;
                mediaNotas: number;
        };

        animes: {
                assistidos: number;
                generoFavorito: string;
                mediaNotas: number;
        };

        ultimos: {
                filme: any;
                serie: any;
                anime: any;
        };
}