import { useEffect, useState } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { getToken } from '@/api/auth';
import { useAuth } from '@/context/auth.context';

export default function Routes() {
const { signed, setSigned } = useAuth();    
const [loading, setLoading] = useState(true);

    useEffect(() => {
        verificarLogin();
    }, []);

    async function verificarLogin() {
        const token = await getToken();

        setSigned(!!token);
        setLoading(false);
    }

    if (loading) {
        return null;
    }

    return signed
        ? <AppRoutes />
        : <AuthRoutes />;
}