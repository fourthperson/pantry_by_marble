import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {baseStyle, primaryColor, serifBold} from '../../config/theme.ts';
import {StackActions, useNavigation} from '@react-navigation/native';
import {routeRegister} from '../../navigation/navigator.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  splashDurationMillis,
  textAnimationDurationMillis,
} from '../../config/constants.ts';

const SplashScreen = (): React.JSX.Element => {
  const navigation = useNavigation();
  const registrationAction = StackActions.replace(routeRegister);

  const textOpacity: Animated.Value = useRef(new Animated.Value(0)).current;

  function animateText() {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: textAnimationDurationMillis,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    animateText();
    setTimeout(() => {
      navigation.dispatch(registrationAction);
    }, splashDurationMillis);
  });

  return (
    <View style={baseStyle.bgContainer}>
      <SafeAreaView style={styles.centered}>
        <Animated.Text style={[styles.brandText, {opacity: textOpacity}]}>
          Pantry
        </Animated.Text>
        <Animated.Text style={[styles.brandSubText, {opacity: textOpacity}]}>
          by Marble
        </Animated.Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 48,
    fontFamily: serifBold,
    color: primaryColor,
  },
  brandSubText: {
    fontSize: 24,
    fontFamily: serifBold,
    color: primaryColor,
  },
});

export default SplashScreen;
