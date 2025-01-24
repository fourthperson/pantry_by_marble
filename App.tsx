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
import i18n from './src/localization/i18n.js';
import {I18nextProvider} from 'react-i18next';

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor={bgColor} barStyle={'dark-content'}/>
            <SafeAreaProvider>
                <I18nextProvider i18n={i18n}>
                    <>
                        <PantryAppNavigator/>
                        <FlashMessage position="top"/>
                    </>
                </I18nextProvider>
            </SafeAreaProvider>
        </Provider>

    );
}

export default App;
