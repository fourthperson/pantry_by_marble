import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash.tsx';
import RegisterScreen from '../screens/register/Register.tsx';

export const routeSplash = 'splash';
export const routeRegister = 'register';
export const routeCart = 'cart';

const Stack = createNativeStackNavigator();

function PantryAppNavigator(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName={routeSplash}>
                <Stack.Screen
                    name={routeSplash}
                    component={SplashScreen}/>
                <Stack.Screen
                    name={routeRegister}
                    component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
});

export default PantryAppNavigator;
