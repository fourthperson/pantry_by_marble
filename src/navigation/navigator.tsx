import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash.tsx';
import RegisterScreen from '../screens/register/Register.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductsListing from '../screens/home/products/ProductsListing.tsx';
import Cart from '../screens/home/cart/Cart.tsx';
import {StyleSheet} from 'react-native';
import {
    bgColor,
    primaryColor, sansRegular,
    tabInactiveColor,
} from '../config/theme.ts';
import Icon from 'react-native-vector-icons/Ionicons';

import EmptyScreen from '../screens/home/empty/Empty.tsx';
import {useSelector} from 'react-redux';

export const routeSplash = 'splash';
export const routeRegister = 'register';
export const routeHome = 'home';
export const routeProducts = 'products';
export const routeCart = 'cart';
export const routeFavourites = 'favourites';
export const routeSearch = 'search';
export const routeProfile = 'profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function tabTint(active: boolean) {
    return active ? 'white' : tabInactiveColor;
}

function Home(): React.JSX.Element {
    const cart = useSelector(state => state.cart);
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        if (!Array.isArray(cart.cart)) {
            return;
        }
        setCartCount(cart.cart.length);
    }, [cart]);

    return (
        <Tab.Navigator
            initialRouteName={routeProducts}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                animation: 'fade',
            }}>
            <Tab.Screen
                name={routeProducts}
                component={ProductsListing}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <Icon
                            name={'home-outline'}
                            size={size}
                            color={tabTint(focused)}
                        />
                    ),
                }}/>
            <Tab.Screen
                name={routeFavourites}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <Icon
                            name={'heart-outline'}
                            size={size}
                            color={tabTint(focused)}
                        />
                    ),
                }}/>
            <Tab.Screen
                name={routeSearch}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <Icon
                            name={'search-outline'}
                            size={size}
                            color={tabTint(focused)}
                        />
                    ),
                }}/>
            <Tab.Screen
                name={routeCart}
                component={Cart}
                options={{
                    tabBarBadge: cartCount === 0 ? undefined : cartCount,
                    tabBarBadgeStyle: styles.tabBarBadgeStyle,
                    tabBarIcon: ({focused, size}) => (
                        <Icon
                            name={'cart-outline'}
                            size={size}
                            color={tabTint(focused)}
                        />
                    ),
                }}/>
            <Tab.Screen
                name={routeProfile}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <Icon
                            name={'person-outline'}
                            size={size}
                            color={tabTint(focused)}
                        />
                    ),
                }}/>
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
    tabBar: {
        height: 80,
        paddingHorizontal: 5,
        paddingTop: 15,
        backgroundColor: primaryColor,
        position: 'static',
        borderTopWidth: 0,
    },
    tabBarBadgeStyle: {
        color: primaryColor,
        fontFamily: sansRegular,
        backgroundColor: bgColor,
    },
});

export default PantryAppNavigator;
