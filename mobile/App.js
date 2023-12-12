import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

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
import ScanPage from './src/pages/Scan';
import ProductPage from './src/pages/Product';
import MenuPage from './src/pages/Menu';

import HomeIcon from './src/assets/home-icon.png';
import HistoryIcon from './src/assets/history-icon.png';
import SearchIcon from './src/assets/search-icon.png';
import ScanIcon from './src/assets/scan-icon.png';
import RotulusSplash from './src/assets/start-splash.png';


function TabApp() {
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
      <Tab.Screen name="ScanPage" component={ScanPage} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Image source={ScanIcon} style={{width: 30, height: 30}} />
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

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={RotulusSplash} style={{width: '100%', height: '100%'}} />
    </View>
  );
}

function AppStack() {

  const [userToken, setUserToken] = useState('');
  const [userName, setUserName] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  async function handleRecoverUserData() {

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      setUserToken(await AsyncStorage.getItem('userToken'));
      setUserName(await AsyncStorage.getItem('userName'));
      await sleep(2000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleRecoverUserData();
    
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={userToken === 'null' || !userToken ? 'WelcomePage' : 'HomePage'} screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="HomePage" component={TabApp} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="MenuPage" component={MenuPage} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;