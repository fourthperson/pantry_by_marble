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

function App(): React.JSX.Element {
    return (
        <SafeAreaProvider>
            <>
                <PantryAppNavigator/>
                <Toast/>
            </>
        </SafeAreaProvider>
    );
}

export default App;
