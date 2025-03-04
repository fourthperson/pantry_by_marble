import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BackArrowSvg from '../../assets/images/back_arrow.svg';
import {primaryColor, sansRegular} from '../config/theme.ts';
import PantrySpacer from './PantrySpacer.tsx';

const PantryBackButton = (props: {
  label: String;
  onPress: () => void;
}): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <BackArrowSvg height={20} width={20} color={primaryColor} />
        <PantrySpacer horizontal={true} space={10} />
        <Text style={styles.labelText}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
