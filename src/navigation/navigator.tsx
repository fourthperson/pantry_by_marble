import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/splash/Splash.tsx';
import RegisterScreen from '../screens/register/Register.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from '../screens/home/products/Products.tsx';
import Cart from '../screens/home/cart/Cart.tsx';
import EmptyScreen from '../screens/home/empty/Empty.tsx';
import {Platform, StyleSheet} from 'react-native';
import {
    bgColor,
    primaryColor, sansRegular,
    tabInactiveColor,
} from '../config/theme.ts';
import HomeSvg from '../../assets/images/home.svg';
import FavouriteSvg from '../../assets/images/favourite.svg';
import SearchSvg from '../../assets/images/search.svg';
import CartSvg from '../../assets/images/cart.svg';
import ProfileSvg from '../../assets/images/profile.svg';
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
                component={Products}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <HomeSvg
                            height={size}
                            width={size}
                            color={tabTint(focused)}/>
                    ),
                }}/>
            <Tab.Screen
                name={routeFavourites}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <FavouriteSvg
                            height={size}
                            width={size}
                            color={tabTint(focused)}/>
                    ),
                }}/>
            <Tab.Screen
                name={routeSearch}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <SearchSvg
                            height={size}
                            width={size}
                            color={tabTint(focused)}/>
                    ),
                }}/>
            <Tab.Screen
                name={routeCart}
                component={Cart}
                options={{
                    tabBarBadge: cartCount === 0 ? undefined : cartCount,
                    tabBarBadgeStyle: styles.tabBarBadgeStyle,
                    tabBarIcon: ({focused, size}) => (
                        <CartSvg
                            height={size}
                            width={size}
                            color={tabTint(focused)}/>
                    ),
                }}/>
            <Tab.Screen
                name={routeProfile}
                component={EmptyScreen}
                options={{
                    tabBarIcon: ({focused, size}) => (
                        <ProfileSvg
                            height={size}
                            width={size}
                            color={tabTint(focused)}/>
                    ),
                }}/>
        </Tab.Navigator>
    );
}

function PantryAppNavigator(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    fullScreenGestureEnabled: false,
                }}
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
        backgroundColor: primaryColor,
        position: 'static',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        paddingTop: Platform.OS === 'ios' ? 15 : 20,
    },
    tabBarBadgeStyle: {
        color: primaryColor,
        fontFamily: sansRegular,
        backgroundColor: bgColor,
    },
});

export default PantryAppNavigator;
