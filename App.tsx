import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthNavigator from './src/navigation/AuthNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
