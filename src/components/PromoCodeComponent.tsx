import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    baseStyle,
    primaryColor,
    sansBold,
    sansRegular,
    tabInactiveColor,
} from '../config/theme.ts';
import {useTranslation} from 'react-i18next';

function PromoCodeComponent(): React.JSX.Element {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.innerRow}>
                <View style={baseStyle.fillSpace}>
                    <TextInput
                        placeholder={t('add_promo_code')}
                        placeholderTextColor={primaryColor}
                        selectionColor={primaryColor}
                        style={styles.addStyle}/>
                </View>
                <View style={styles.divider}/>
                <TouchableOpacity>
                    <Text style={styles.applyStyle}>{t('apply')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 80,
        borderColor: primaryColor,
        borderWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 10 : 2,
        paddingBottom: Platform.OS === 'ios' ? 10 : 2,
        paddingStart: 0,
        paddingEnd: 20,
    },
    innerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    addStyle: {
        fontFamily: sansRegular,
        color: primaryColor,
        marginStart: 20,
        fontSize: 12,
    },
    applyStyle: {
        fontFamily: sansBold,
        color: tabInactiveColor,
        marginStart: 40,
        fontSize: 12,
    },
    divider: {
        backgroundColor: primaryColor,
        height: 20,
        width: 1,
    },
});

export default PromoCodeComponent;
