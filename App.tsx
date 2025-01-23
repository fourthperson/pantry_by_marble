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

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
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
