import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash.tsx';
import RegisterScreen from '../screens/register/Register.tsx';
import ProductsListing from '../screens/products/ProductsListing.tsx';

export const routeSplash = 'splash';
export const routeRegister = 'register';
export const routeProducts = 'products';
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
                <Stack.Screen
                    name={routeProducts}
                    component={ProductsListing}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default PantryAppNavigator;
