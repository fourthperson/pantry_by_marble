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
import {primaryColor, sansRegular, serifBold} from '../config/theme.ts';
import CloseSvg from '../../assets/images/close.svg';
import EyeSvg from '../../assets/images/eye.svg';

const PantryTextInput = (props: {
  label: string;
  value: string;
  validation: string;
  isValid: boolean;
  onTextChanged: (s: string) => void;
  keyboardType: KeyboardTypeOptions;
  isPasswordField?: boolean;
}): React.JSX.Element => {
  const [value, setValue] = useState(props.value);
  const [showValue, setShowValue] = useState(!props.isPasswordField);

  const color = props.isValid ? primaryColor : 'red';

  useEffect(() => {
    props.onTextChanged(value);
  }, [props, value]);

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
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            props.isPasswordField ? setShowValue(prev => !prev) : setValue('');
          }}>
          {props.isPasswordField ? (
            //  conditional icon here
            <EyeSvg height={22} width={22} color={color} />
          ) : (
            <CloseSvg height={22} width={22} color={color} />
          )}
        </TouchableOpacity>
      </View>
      <View style={props.isValid ? styles.dividerValid : styles.dividerError} />
      <Text style={styles.validationText}>
        {value !== '' && !props.isValid ? props.validation : ''}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
};

export const PantryPhoneInput = (props: {
  label: string;
  prefix: string;
  value: string;
  validation: string;
  isValid: boolean;
  onTextChanged: (s: string) => void;
  keyboardType: KeyboardTypeOptions;
}): React.JSX.Element => {
  const [value, setValue] = useState(props.value);

  const color = props.isValid ? primaryColor : 'red';

  useEffect(() => {
    props.onTextChanged(value);
  }, [props, value]);

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
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setValue('')}>
          <CloseSvg height={22} width={22} color={color} />
        </TouchableOpacity>
      </View>
      <View style={props.isValid ? styles.dividerValid : styles.dividerError} />
      <Text style={styles.validationText}>
        {value !== '' && !props.isValid ? props.validation : ''}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: primaryColor,
    fontFamily: sansRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  validationText: {
    color: 'red',
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
  dividerValid: {
    backgroundColor: primaryColor,
    height: 1,
    marginTop: Platform.OS === 'ios' ? 7.5 : 2,
  },
  dividerError: {
    backgroundColor: 'red',
    height: 1,
    marginTop: Platform.OS === 'ios' ? 7.5 : 2,
  },
  spacer: {
    height: 20,
  },
});

export default PantryTextInput;
