import React, {useEffect, useRef} from 'react';
import {
    Animated, StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {
    baseStyle, bgColor,
    primaryColor,
    serifBold,
} from '../../config/theme.ts';
import {useNavigation} from '@react-navigation/native';
import {routeRegister} from '../../navigation/navigator.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    splashDurationMillis,
    textAnomationDurationMillis,
} from '../../config/constants.ts';

function SplashScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const textOpacity: Animated.Value = useRef(new Animated.Value(0)).current;

    function animateText() {
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: textAnomationDurationMillis,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        animateText();
        setTimeout(() => {
            navigation.replace(routeRegister);
        }, splashDurationMillis);
    });

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.centered}>
                <Animated.Text style={[styles.brandText, {opacity: textOpacity}]}>
                    Pantry
                </Animated.Text>
                <Animated.Text style={[styles.brandSubText, {opacity: textOpacity}]}>
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
