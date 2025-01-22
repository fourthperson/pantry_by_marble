import React from 'react';
import { Text, View } from 'react-native';
import { baseStyle } from '../../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function Cart(): React.JSX.Element {
    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={baseStyle.fillSpace}>
                <Text>Cart goes Here!</Text>
            </SafeAreaView>
        </View>
    );
}

export default Cart;
