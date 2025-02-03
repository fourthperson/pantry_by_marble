import React from 'react';
import {StyleSheet, View} from 'react-native';
import {primaryColor} from '../config/theme.ts';

const PantryBar = (): React.JSX.Element => {
  return <View style={styles.greenBar} />;
};

const styles = StyleSheet.create({
  greenBar: {
    height: 15,
    backgroundColor: primaryColor,
    width: '100%',
    marginTop: 10,
  },
});

export default PantryBar;
