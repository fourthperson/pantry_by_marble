import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {bgColor} from "../../config/theme.ts";

function SplashScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text>Splash Screen</Text>
            </SafeAreaView>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgColor
    },
});
