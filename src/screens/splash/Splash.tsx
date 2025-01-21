import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {bgColor, primaryColor, serifBold} from '../../config/theme.ts';

function SplashScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.centered}>
                <Text style={styles.brandText}>Pantry</Text>
                <Text style={styles.brandSubText}>by Marble</Text>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgColor,
    },
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
