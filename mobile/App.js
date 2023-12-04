import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import WelcomePage from './src/pages/Welcome';
import StartPage from './src/pages/Start';
import RegisterPage from './src/pages/Register';
import HomePage from './src/pages/Home';
import LoginPage from './src/pages/Login';


const auth = false;

function NewUserStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false}} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function LoggedUserStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      {auth ? <LoggedUserStack /> : <NewUserStack /> }
    </NavigationContainer>
  );
};

export default App;