import { createContext, useContext, useState } from 'react';
import { User } from '@/global/themes';

interface AuthContextData {
    signed: boolean;
    setSigned: (value: boolean) => void;

    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
    const [signed, setSigned] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ signed, setSigned, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}