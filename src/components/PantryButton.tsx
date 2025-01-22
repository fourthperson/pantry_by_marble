import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansRegular} from '../config/theme.ts';

export interface PantryButtonProps {
    label: string;
    onPress: () => void;
}

function PantryButton(props: PantryButtonProps): React.JSX.Element {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.buttonStyle}>
                <Text style={styles.labelStyle}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: primaryColor,
        height: 56,
        borderRadius: 80,
        alignContent: 'center',
        justifyContent: 'center',
    },
    labelStyle: {
        alignSelf: 'center',
        fontFamily: sansRegular,
        color: '#ffffff',
        fontSize: 14,
    },
});

export default PantryButton;
