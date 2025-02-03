import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AddSvg from '../../assets/images/add.svg';
import {primaryColor} from '../config/theme.ts';
import SubtractSvg from '../../assets/images/subtract.svg';

const CartQuantityButton = (props: {
  onTap: () => void;
  positive: boolean;
}): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onTap}>
      <View style={styles.seekButton}>
        {props.positive ? (
          <AddSvg color={primaryColor} size={20} />
        ) : (
          <SubtractSvg color={primaryColor} size={20} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  seekButton: {
    borderColor: primaryColor,
    borderWidth: 1.5,
    borderRadius: 15,
    paddingHorizontal: 5,
    height: 30,
    width: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default CartQuantityButton;
