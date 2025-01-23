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
    serifBold,
} from '../../config/theme.ts';
import PantryTextInput from '../../components/PantryTextInput.tsx';
import PantryButton from '../../components/PantryButton.tsx';
import PantrySpacer from '../../components/PantrySpacer.tsx';
import PantryBackButton from '../../components/PantryBackButton.tsx';
import PantryBar from '../../components/PantryBar.tsx';
import {useNavigation} from '@react-navigation/native';
import {routeHome} from '../../navigation/navigator.tsx';
import {alertMsg} from '../../util/util.ts';
import * as EmailValidator from 'email-validator';

function RegisterScreen(): React.JSX.Element {
    const [fullName, setFullname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function products() {
        navigation.push(routeHome);
    }

    function validateInput() {
        if (fullName === '') {
            alertMsg('Enter your full name', 'warning');
            return;
        }
        if (fullName.length < 3) {
            alertMsg('Enter a valid full name', 'warning');
            return;
        }
        if (emailAddress === '') {
            alertMsg('Enter your email address', 'warning');
            return;
        }
        if (!EmailValidator.validate(emailAddress)) {
            alertMsg('Enter a valid email addres', 'warning');
            return;
        }
        if (password === '') {
            alertMsg('Set your password', 'warning');
            return;
        }
        if (password.length < 8) {
            alertMsg('Password should be at least 8 characters long', 'warning');
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
                                Explore app
                            </Text>
                        </View>
                        <Text style={styles.welcomeText}>
                            Welcome to{'\n'}Pantry by Marble
                        </Text>
                        <Text style={styles.rationaleText}>
                            Sign up for easy payment, collection{'\n'}and much more
                        </Text>
                        <PantryBar/>
                        <PantrySpacer space={75} horizontal={false}/>
                        <PantryTextInput
                            label={'Full Name'}
                            value={fullName}
                            onTextChanged={setFullname}
                            keyboardType={'default'}
                            isPasswordField={false}/>
                        <PantryTextInput
                            label={'Email'}
                            value={emailAddress}
                            onTextChanged={setEmailAddress}
                            keyboardType={'email-address'}
                            isPasswordField={false}/>
                        <PantryTextInput
                            label={'Mobile Number'}
                            value={mobileNumber}
                            onTextChanged={setMobileNumber}
                            keyboardType={'phone-pad'}
                            isPasswordField={false}/>
                        <PantryTextInput
                            label={'Password'}
                            value={password}
                            onTextChanged={setPassword}
                            keyboardType={'default'}
                            isPasswordField={true}/>
                        <PantryButton
                            label={'Sign up'}
                            onPress={validateInput}/>
                        <PantrySpacer horizontal={false} space={20}/>
                        <View style={styles.loginRow}>
                            <Text style={styles.loginQuestion}>Have an account?</Text>
                            <PantrySpacer space={5} horizontal={true}/>
                            <Text style={styles.loginText}>Log In</Text>
                        </View>
                        <PantrySpacer horizontal={false} space={20}/>
                        <View style={styles.orRow}>
                            <View style={styles.divider}/>
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.divider}/>
                        </View>
                        <PantrySpacer horizontal={false} space={20}/>
                        <PantryButton
                            label={'Explore our app'}
                            onPress={products}/>
                        <PantrySpacer horizontal={false} space={20}/>
                        <Text style={styles.terms}>
                            <Text style={styles.termsText}>By signing up you agree to our </Text>
                            <Text style={styles.termsLink}>Terms, Data Policy</Text>
                            <Text style={styles.termsText}> and </Text>
                            <Text style={styles.termsLink}>Cookies Policy</Text>
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
        fontFamily: serifBold,
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
