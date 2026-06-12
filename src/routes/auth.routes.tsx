import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/pages/login';
import Register from '@/pages/register';

const Stack = createStackNavigator();

//Rotas Públicas
export default function AuthRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}