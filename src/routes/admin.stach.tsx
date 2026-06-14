import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminUsers from '@/pages/admin/usuarios';
import UserStats from '@/pages/admin/usuarios/userStats';

const Stack = createNativeStackNavigator();

export default function AdminUsersStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="UsersList"
                component={AdminUsers}
            />

            <Stack.Screen
                name="UserStats"
                component={UserStats}
            />
        </Stack.Navigator>
    );
}