import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BottomRoutes from "./bottom.routes";
import newTitle from "@/pages/newTitle";

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
                name='Login'
                component={Login}
            />

            <Stack.Screen
                name='BottomRoutes'
                component={BottomRoutes}
            />

            <Stack.Screen
                name='newTitle'
                component={newTitle}
            />

        </Stack.Navigator>

    )

}