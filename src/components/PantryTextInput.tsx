import React, {useEffect, useState} from 'react';
import {
    KeyboardTypeOptions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    primaryColor,
    sansRegular,
    serifBold,
} from '../config/theme.ts';
import Icon from 'react-native-vector-icons/Feather';

export interface PantryTextInputprops {
    label: string;
    value: string;
    onTextChanged: (s: string) => void;
    keyboardType: KeyboardTypeOptions;
    isPasswordField: boolean;
}

function PantryTextInput(props: PantryTextInputprops): React.JSX.Element {
    const [value, setValue] = useState(props.value);
    const [showValue, setShowValue] = useState(!props.isPasswordField);

    useEffect(() => {
        props.onTextChanged(value);
    }, [props, value]);

    function clear() {
        setValue('');
    }

    return (
        <View>
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.inputRow}>
                <View style={styles.fillSpace}>
                    <TextInput
                        style={styles.inputStyle}
                        value={value}
                        selectionColor={primaryColor}
                        autoCapitalize="none"
                        onChangeText={setValue}
                        cursorColor={primaryColor}
                        secureTextEntry={props.isPasswordField && !showValue}
                        keyboardType={props.keyboardType}
                        underlineColorAndroid={'transparent'}/>
                </View>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        props.isPasswordField ? setShowValue(prev => !prev) : clear();
                    }}>
                    <Icon
                        name={props.isPasswordField ? showValue ? 'eye-off' : 'eye' : 'x'}
                        color={primaryColor}
                        size={22}/>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}/>
            <View style={styles.spacer}/>
        </View>
    );
}

export interface PhoneInputProps {
    label: string;
    prefix: string;
    value: string;
    onTextChanged: (s: string) => void;
    keyboardType: KeyboardTypeOptions;
}

export function PantryPhoneInput(props: PhoneInputProps): React.JSX.Element {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onTextChanged(value);
    }, [props, value]);

    function clear() {
        setValue('');
    }

    return (
        <View>
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.inputRow}>
                <Text style={styles.inputStyle}>{`${props.prefix}  |  `}</Text>
                <View style={styles.fillSpace}>
                    <TextInput
                        style={styles.inputStyle}
                        value={value}
                        selectionColor={primaryColor}
                        autoCapitalize="none"
                        onChangeText={setValue}
                        cursorColor={primaryColor}
                        keyboardType={props.keyboardType}
                        underlineColorAndroid={'transparent'}/>
                </View>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={clear}>
                    <Icon
                        name={'x'}
                        color={primaryColor}
                        size={22}/>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}/>
            <View style={styles.spacer}/>
        </View>
    );
}

const styles = StyleSheet.create({
    labelText: {
        color: primaryColor,
        fontFamily: sansRegular,
        fontSize: 12,
        lineHeight: 16,
    },
    fillSpace: {
        flex: 1,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    inputStyle: {
        color: primaryColor,
        fontFamily: serifBold,
        fontSize: 18,
        lineHeight: 24,
    },
    closeButton: {
        height: 24,
        width: 24,
    },
    divider: {
        backgroundColor: primaryColor,
        height: 1,
        marginTop: Platform.OS === 'ios' ? 7.5 : 2,
    },
    spacer: {
        height: 30,
    },
});

export default PantryTextInput;
