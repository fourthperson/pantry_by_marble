/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PantryAppNavigator from './src/navigation/navigator.tsx';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './src/store/store';

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <>
                    <PantryAppNavigator/>
                    <Toast/>
                </>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
