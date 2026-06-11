import { createContext, useContext, useState, useEffect } from 'react';
import { getTheme, saveTheme } from '@/api/auth';

type ThemeContextType = {
    tema: string;
    setTema: (cor: string) => void;
};

const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }: any) {
    const [tema, setTemaState] = useState('#0097b2');

     useEffect(() => {
        carregarTema();
    }, []);

    async function carregarTema() {
        const temaSalvo = await getTheme();

        if (temaSalvo) {
            setTemaState(temaSalvo);
        }
    }

    async function setTema(cor: string) {
        setTemaState(cor);
        await saveTheme(cor);
    }

    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);