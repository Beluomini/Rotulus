import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import WelcomePage from './src/pages/Welcome';
import StartPage from './src/pages/Start';
import RegisterPage from './src/pages/Register';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false}} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;