import React, {useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    baseStyle,
    primaryColor,
    sansBold,
    sansRegular,
    serifBoldItalic,
} from '../../config/theme.ts';
import PantryTextInput, {PantryPhoneInput} from '../../components/PantryTextInput.tsx';
import PantryButton from '../../components/PantryButton.tsx';
import PantrySpacer from '../../components/PantrySpacer.tsx';
import PantryBackButton from '../../components/PantryBackButton.tsx';
import PantryBar from '../../components/PantryBar.tsx';
import {useNavigation} from '@react-navigation/native';
import {routeHome} from '../../navigation/navigator.tsx';
import {alertMsg, validPhone} from '../../util/util.ts';
import * as EmailValidator from 'email-validator';
import {
    defaultCountryCallingCode,
    defaultCountryCode,
} from '../../config/constants.ts';
import {useTranslation} from 'react-i18next';

function RegisterScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const {t} = useTranslation();

    const [fullName, setFullname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    function validateInput() {
        if (fullName === '') {
            alertMsg(t('validation_empty_name'), 'warning');
            return;
        }
        if (fullName.length < 3) {
            alertMsg(t('validation_invalid_name'), 'warning');
            return;
        }
        if (emailAddress === '') {
            alertMsg(t('validation_empty_email'), 'warning');
            return;
        }
        if (!EmailValidator.validate(emailAddress)) {
            alertMsg(t('validation_invalid_email'), 'warning');
            return;
        }
        if (mobileNumber === '') {
            alertMsg(t('validation_empty_phone'), 'warning');
            return;
        }
        if (!validPhone(mobileNumber, defaultCountryCode)) {
            alertMsg(t('validation_invalid_phone'), 'warning');
            return;
        }
        if (password === '') {
            alertMsg(t('validation_empty_password'), 'warning');
            return;
        }
        if (password.length < 8) {
            alertMsg(t('validation_invalid_password'), 'warning');
            return;
        }
        navigation.push(routeHome);
    }

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.topGroup}>
                        <View style={styles.backArrowBar}>
                            <PantryBackButton label={''} onPress={() => {
                            }}/>
                        </View>
                        <View style={styles.exploreBar}>
                            <Text style={styles.exploreText}>
                                {t('explore_app')}
                            </Text>
                        </View>
                        <Text style={styles.welcomeText}>
                            {t('welcome_to_app')}
                        </Text>
                        <Text style={styles.rationaleText}>
                            {t('sign_up_rationale')}
                        </Text>
                        <PantryBar/>
                        <PantrySpacer space={75} horizontal={false}/>
                        <PantryTextInput
                            label={t('label_full_name')}
                            value={fullName}
                            onTextChanged={setFullname}
                            keyboardType={'default'}/>
                        <PantryTextInput
                            label={t('label_email')}
                            value={emailAddress}
                            onTextChanged={setEmailAddress}
                            keyboardType={'email-address'}/>
                        <PantryPhoneInput
                            label={t('label_mobile_number')}
                            prefix={defaultCountryCallingCode}
                            value={mobileNumber}
                            onTextChanged={setMobileNumber}
                            keyboardType={'phone-pad'}/>
                        <PantryTextInput
                            label={t('label_password')}
                            value={password}
                            onTextChanged={setPassword}
                            keyboardType={'default'}
                            isPasswordField={true}/>
                        <PantryButton
                            label={t('label_sign_up')}
                            onPress={validateInput}/>
                        <PantrySpacer horizontal={false} space={20}/>
                        <View style={styles.loginRow}>
                            <Text style={styles.loginQuestion}>Have an account?</Text>
                            <PantrySpacer space={5} horizontal={true}/>
                            <Text style={styles.loginText}>{t('label_login')}</Text>
                        </View>
                        <PantrySpacer horizontal={false} space={20}/>
                        <View style={styles.orRow}>
                            <View style={styles.divider}/>
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.divider}/>
                        </View>
                        <PantrySpacer horizontal={false} space={20}/>
                        <PantryButton label={t('explore_our_app')}/>
                        <PantrySpacer horizontal={false} space={20}/>
                        <Text style={styles.terms}>
                            <Text style={styles.termsText}>{t('label_terms_1')}</Text>
                            <Text style={styles.termsLink}>{t('label_terms_2')}</Text>
                            <Text style={styles.termsText}>{t('label_terms_3')}</Text>
                            <Text style={styles.termsLink}>{t('label_terms_4')}</Text>
                        </Text>
                        <PantrySpacer horizontal={false} space={20}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topGroup: {
        marginStart: 16,
        marginEnd: 16,
    },
    backArrowBar: {
        flexDirection: 'row',
        height: 20,
    },
    exploreBar: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    exploreText: {
        color: primaryColor,
        fontSize: 14,
        fontFamily: sansRegular,
    },
    welcomeText: {
        color: primaryColor,
        fontFamily: serifBoldItalic,
        fontSize: 40,
        lineHeight: 50,
    },
    rationaleText: {
        color: primaryColor,
        fontFamily: sansRegular,
        fontSize: 16,
        lineHeight: 24,
    },
    loginRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginQuestion: {
        fontFamily: sansRegular,
        color: primaryColor,
        fontSize: 14,
    },
    loginText: {
        fontFamily: sansBold,
        color: primaryColor,
        fontSize: 14,
    },
    terms: {
        textAlign: 'center',
    },
    termsText: {
        color: primaryColor,
        fontFamily: sansRegular,
        fontSize: 12,
        lineHeight: 16,
    },
    termsLink: {
        color: primaryColor,
        fontFamily: sansBold,
        fontSize: 12,
        lineHeight: 16,
    },
    orRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    divider: {
        backgroundColor: primaryColor,
        height: 1,
        flex: 1,
        alignSelf: 'center',
    },
    orText: {
        marginStart: 20,
        marginEnd: 20,
        fontFamily: sansRegular,
        fontSize: 14,
        color: primaryColor,
    },
});

export default RegisterScreen;
