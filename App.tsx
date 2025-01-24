/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PantryAppNavigator from './src/navigation/navigator.tsx';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {StatusBar} from 'react-native';
import {bgColor} from './src/config/theme.ts';

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor={bgColor} barStyle={'dark-content'}/>
            <SafeAreaProvider>
                <>
                    <PantryAppNavigator/>
                    <FlashMessage position="top"/>
                </>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
