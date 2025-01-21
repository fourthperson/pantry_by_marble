/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PantryAppNavigator from "./src/navigation/navigator.tsx";

function App(): React.JSX.Element {
//  const isDarkMode = useColorScheme() === 'dark';

//  const backgroundStyle = {
//    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//  };

  return <PantryAppNavigator/>
}

export default App;
