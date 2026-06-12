import { createStackNavigator } from '@react-navigation/stack';

import BottomRoutes from './bottom.routes';
import NewTitle from '@/pages/newTitle';
import Settings from '@/pages/settings';

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#1f2937',
                },
            }}
        >
            <Stack.Screen
                name="BottomRoutes"
                component={BottomRoutes}
            />

            <Stack.Screen
                name="NewTitle"
                component={NewTitle}
            />

            <Stack.Screen
                name="Settings"
                component={Settings}
            />
        </Stack.Navigator>
    );
}