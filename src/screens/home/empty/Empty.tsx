import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    baseStyle,
    primaryColor,
    sansRegular,
} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

function EmptyScreen(): React.JSX.Element {
    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={baseStyle.fillSpace}>
                <View style={styles.centerContent}>
                    <Text style={styles.emptyText}>Empty Screen!</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontFamily: sansRegular,
        fontSize: 14,
        color: primaryColor,
    },
});

export default EmptyScreen;
