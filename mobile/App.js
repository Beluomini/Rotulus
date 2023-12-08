import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

import WelcomePage from './src/pages/Welcome';
import StartPage from './src/pages/Start';
import RegisterPage from './src/pages/Register';
import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import HistoryPage from './src/pages/History';
import SearchPage from './src/pages/Search';

function NewUserStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false}} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}} />
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} options={{headerShown: false}} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function LoggedUserStack() {
  return (
    <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false}} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}} />
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} options={{headerShown: false}} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const App = () => {

  const [userToken, setUserToken] = useState('');
  const [userName, setUserName] = useState('');

  async function handleRecoverUserData() {
    setUserToken(await AsyncStorage.getItem('userToken'));
    setUserName(await AsyncStorage.getItem('userName'));

  }

  useEffect(() => {
    handleRecoverUserData();
  }, []);

  return (
    <NavigationContainer>
      { userToken===null ? <NewUserStack /> : <LoggedUserStack /> }
    </NavigationContainer>
  );
};

export default App;