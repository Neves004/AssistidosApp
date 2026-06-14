import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminDashboard from '@/pages/admin/dashboard';
import AdminUsersStack from './admin.stach';
import SettingsAdmin from '@/pages/admin/settingsAdmin';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AdminRoutes() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: () => null,
                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 90, // fixo e limpo
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#38bdf8',
                tabBarInactiveTintColor: '#64748b',
            }}>

            <Tab.Screen
                name="Dashboard"
                component={AdminDashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="dashboard" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Usuarios"
                component={AdminUsersStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }}


            />
            <Tab.Screen
                name="Configurações"
                component={SettingsAdmin}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" size={size} color={color} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
}