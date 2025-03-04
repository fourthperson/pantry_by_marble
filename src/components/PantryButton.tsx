import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, sansRegular, tabInactiveColor} from '../config/theme.ts';

export interface PantryButtonProps {
  label: string;
  enabled?: boolean;
  onPress?: () => void;
}

const PantryButton = (props: PantryButtonProps): React.JSX.Element => {
  return props.enabled == null || props.enabled ? (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.buttonStyle}>
        <Text style={styles.labelStyle}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.disabledStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: primaryColor,
    height: 56,
    borderRadius: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
  disabledStyle: {
    backgroundColor: tabInactiveColor,
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
