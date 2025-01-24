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
import {useTranslation} from 'react-i18next';

function EmptyScreen(): React.JSX.Element {
    const {t} = useTranslation();

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={baseStyle.fillSpace}>
                <View style={styles.centerContent}>
                    <Text style={styles.emptyText}>{t('empty_screen')}</Text>
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
