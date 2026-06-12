import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
    const [signed, setSigned] = useState(false);

    return (
        <AuthContext.Provider value={{ signed, setSigned }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}