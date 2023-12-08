import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import WelcomePage from './src/pages/Welcome';
import StartPage from './src/pages/Start';
import RegisterPage from './src/pages/Register';
import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import HistoryPage from './src/pages/History';
import SearchPage from './src/pages/Search';

import HomeIcon from './src/assets/home-icon.png';
import HistoryIcon from './src/assets/history-icon.png';
import SearchIcon from './src/assets/search-icon.png';

import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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
    <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown: false}} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} options={{headerShown: false}} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      title: '',
      tabBarStyle: { height: 60, alignItems: 'center', justifyContent: 'center', paddingVertical: 10},
    })}>
      <Tab.Screen name="Home" component={HomePage} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Image source={HomeIcon} style={{width: 30, height: 30}} />
        ),
        }}/>
      <Tab.Screen name="HistoryPage" component={HistoryPage} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Image source={HistoryIcon} style={{width: 30, height: 30}} />
        ),
        }}/>
      <Tab.Screen name="SearchPage" component={SearchPage} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Image source={SearchIcon} style={{width: 30, height: 30}} />
        ),
        }} />
    </Tab.Navigator>
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
      <TabNavigation />
      {/* { userToken===null ? <NewUserStack /> : <LoggedUserStack /> } */}
    </NavigationContainer>
  );
};

export default App;