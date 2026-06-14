import { useEffect, useState } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { getToken, getUser } from '@/api/auth';
import { useAuth } from '@/context/auth.context';
import AdminRoutes from './admin.routes';


export default function Routes() {
    const { signed, setSigned, user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        verificarLogin();
    }, []);

    async function verificarLogin() {
        const token = await getToken();
        const userStorage = await getUser();

        if (!token) {
            setSigned(false);
            setUser(null);
            setLoading(false);
            return;
        }

        setSigned(true);

        if (userStorage) {
            const parsedUser = JSON.parse(userStorage);
            setUser(parsedUser);
        } else {
            setUser(null);
        }

        setLoading(false);
    }

    if (loading) {
        return null;
    }

    if (!signed) {
        return <AuthRoutes />;
    }

    if (user?.role === 'superadmin') {
        return <AdminRoutes />;
    }

    return <AppRoutes />;
}