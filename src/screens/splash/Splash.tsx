import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {baseStyle, primaryColor, serifBold} from '../../config/theme.ts';
import {useNavigation} from '@react-navigation/native';
import {routeRegister} from '../../navigation/navigator.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';

function SplashScreen(): React.JSX.Element {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace(routeRegister);
        }, 2000);
    });

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.centered}>
                <Text style={styles.brandText}>Pantry</Text>
                <Text style={styles.brandSubText}>by Marble</Text>
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
