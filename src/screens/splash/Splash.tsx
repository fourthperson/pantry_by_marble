import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {
    baseStyle,
    primaryColor,
    serifBold,
} from '../../config/theme.ts';
import {useNavigation} from '@react-navigation/native';
import {routeRegister} from '../../navigation/navigator.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';

function SplashScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const fade: Animated.Value = useRef(new Animated.Value(0)).current;

    function animation() {
        Animated.timing(fade, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        animation();
        setTimeout(() => {
            navigation.replace(routeRegister);
        }, 2250);
    });

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.centered}>
                <Animated.Text style={[styles.brandText, {opacity: fade}]}>
                    Pantry
                </Animated.Text>
                <Animated.Text style={[styles.brandSubText, {opacity: fade}]}>
                    by Marble
                </Animated.Text>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandText: {
        fontSize: 48,
        fontFamily: serifBold,
        color: primaryColor,
    },
    brandSubText: {
        fontSize: 24,
        fontFamily: serifBold,
        color: primaryColor,
    },
});

export default SplashScreen;
