import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash.tsx';
import RegisterScreen from '../screens/register/Register.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductsListing from '../screens/home/products/ProductsListing.tsx';
import Cart from '../screens/home/cart/Cart.tsx';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {baseStyle} from '../config/theme.ts';
import Icon from 'react-native-vector-icons/Feather';

export const routeSplash = 'splash';
export const routeRegister = 'register';
export const routeHome = 'home';
export const routeProducts = 'products';
export const routeCart = 'cart';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface PanytryTabProps {
    isActive: boolean;
    route: string;
    icon: string;
    navigation: any;
}

function PantryTab(props: PanytryTabProps): React.JSX.Element {
    function navigate() {
        props.navigation.navigate(props.route);
    }

    return (
        <TouchableOpacity onPress={navigate}>
            <View style={baseStyle.fillSpace}>
                <Icon name={props.icon} color={'#ffffff'}/>
            </View>
        </TouchableOpacity>
    );
}

function PantryTabBar({state, descriptors, navigation}): React.JSX.Element {
    return (
        <View style={styles.row}>
            <PantryTab
                navigation={navigation}
                isActive={state.index === 0}
                route={routeProducts}
                icon={'home'}/>
            <PantryTab
                navigation={navigation}
                isActive={state.index === 1}
                route={routeCart}
                icon={'shopping-cart'}/>
        </View>
    );
}

function Home(): React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={(props) => PantryTabBar({...props})}>
            <Tab.Screen
                name={routeProducts}
                component={ProductsListing}/>
            <Tab.Screen
                name={routeCart}
                component={Cart}/>
        </Tab.Navigator>
    );
}

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
                    name={routeHome}
                    component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default PantryAppNavigator;
