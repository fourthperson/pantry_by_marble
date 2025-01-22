import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {primaryColor, sansRegular} from '../config/theme.ts';
import PantrySpacer from './PantrySpacer.tsx';

export interface PantryBackButtonProps {
    label: String;
    onPress: () => void;
}

function PantryBackButton(props: PantryBackButtonProps): React.JSX.Element {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Icon name="chevron-left" size={20} color={primaryColor}/>
                <PantrySpacer horizontal={true} space={10}/>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    labelText: {
        color: primaryColor,
        fontSize: 14,
        fontFamily: sansRegular,
    },
});

export default PantryBackButton;
