import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BottomRoutes from "./bottom.routes";
import NewTitle from "@/pages/newTitle";
import Register from "@/pages/register";
import Settings from "@/pages/settings";

export default function Routes() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#1f2937'
                }
            }}
        >
            <Stack.Screen
                name='Register'
                component={Register}
            />

            <Stack.Screen
                name='Login'
                component={Login}
            />

            <Stack.Screen
                name='BottomRoutes'
                component={BottomRoutes}
            />

            <Stack.Screen
                name='NewTitle'
                component={NewTitle}
            />
            
            <Stack.Screen
                name='Settings'
                component={Settings}
            />

        </Stack.Navigator>

    )

}