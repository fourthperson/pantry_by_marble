import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {baseStyle, primaryColor, sansRegular, serifBold, serifItalic, serifRegular} from '../../config/theme.ts';
import Icon from 'react-native-vector-icons/Feather';
import PantryTextInput from '../../components/PantryTextInput.tsx';

function RegisterScreen(): React.JSX.Element {
    const [fullName, setFullname] = useState('John Doe');

    return (
        <View style={baseStyle.bgContainer}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.topGroup}>
                        <View style={styles.backArrowBar}>
                            <Icon name="chevron-left" size={20} color={primaryColor}/>
                        </View>
                        <View style={styles.exploreBar}>
                            <Text style={styles.exploreText}>Explore app</Text>
                        </View>
                        <Text style={styles.welcomeText}>Welcome to{'\n'}Pantry by Marble</Text>
                        <Text style={styles.rationaleText}>Sign up for easy payment, collection{'\n'}and much
                            more</Text>
                        <View style={styles.greenBar}/>
                        <View style={{height: 50}}/>
                        <PantryTextInput
                            label={'Full Name'}
                            value={fullName}
                            onTextChanged={setFullname}/>
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
    greenBar: {
        height: 15,
        backgroundColor: primaryColor,
        width: '100%',
        marginTop: 10,
    },
});

export default RegisterScreen;
