import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {primaryColor, sansBold, sansRegular} from '../config/theme.ts';

const ToggleAbleTile = (props: {
  title: string;
  selected: boolean;
  onTap: (title: string) => void;
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onTap(props.title);
      }}>
      <Text style={props.selected ? styles.textActive : styles.textInactive}>
        {props.title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textActive: {
    fontFamily: sansBold,
    color: primaryColor,
    fontSize: 14,
    paddingEnd: 15,
    paddingStart: 15,
  },
  textInactive: {
    fontFamily: sansRegular,
    color: primaryColor,
    fontSize: 14,
    paddingEnd: 15,
    paddingStart: 15,
  },
});

export default ToggleAbleTile;
