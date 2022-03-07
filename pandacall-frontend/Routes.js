import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './pages/Home';
import Calling from './pages/Calling';
import Incoming from './pages/Incoming';
import Login from './pages/Login';
import Register from './pages/Register';


const Routes = () => {

    const Stack = createNativeStackNavigator();

    const screenOptions = {
        headerShown: false
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name="Calling" component={Calling} />
                <Stack.Screen name="Incoming" component={Incoming} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;