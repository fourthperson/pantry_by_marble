import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansRegular, serifBold} from '../config/theme.ts';
import Icon from 'react-native-vector-icons/Feather';

export interface PantryTextInputprops {
    label: string;
    value: string;
    onTextChanged: (s: string) => void
}

function PantryTextInput(props: PantryTextInputprops): React.JSX.Element {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        props.onTextChanged(value);
    }, [value]);

    function clear() {
        setValue('');
    }

    return (
        <View>
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.inputStyle}
                    value={value}
                    onChangeText={setValue}
                    cursorColor={primaryColor}
                    underlineColorAndroid={'transparent'}/>
                <TouchableOpacity style={{height: 24, width: 24}} onPress={clear}>
                    <Icon name={'x'} color={primaryColor} size={24}/>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}/>
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
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    inputStyle: {
        color: primaryColor,
        fontFamily: serifBold,
        fontSize: 18,
        lineHeight: 24,
    },
    divider: {
        backgroundColor: primaryColor,
        height: 1,
        marginTop: 5,
    },
});

export default PantryTextInput;
