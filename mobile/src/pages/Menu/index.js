import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ArrowIcon from '../../assets/down-arrow-red-icon.png';
import SettingsIcon from '../../assets/settings-icon.png';
import LockedIcon from '../../assets/locked-icon.png';
import ExitIcon from '../../assets/exit-icon.png';

export default function MenuPage({ navigation, route}) {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    async function handleLogout() {

        await AsyncStorage.multiRemove(['userToken', 'userId', 'userName', 'userEmail', 'userStatus']);
        setUserName('');
        setUserEmail('');

        navigation.navigate('StartPage');
    }

    handleRecoverUserData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        setUserName(userName);
        setUserEmail(userEmail);
    }

    useEffect(() => {
        handleRecoverUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.arrowIconButton} onPress={() => {navigation.goBack()}}>
                    <Image source={ArrowIcon} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.title} >Perfil</Text>
                <Text style={styles.email} >{userEmail}</Text>
            </View>


                {userEmail === '' || userEmail === null ? (
                    <View style={styles.loggedOptions}>
                        <View style={styles.optionAccount}>
                            <Pressable style={styles.pressableOption} onPress={() => {navigation.navigate('LoginPage')}}>
                                <Image source={LockedIcon} style={styles.settingsIcon} />
                                <Text style={styles.optionText}>Entrar</Text>
                                <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loggedOptions}>
                        <View style={styles.optionAccount}>
                            <Pressable style={styles.pressableOption} onPress={() => {navigation.navigate('AccountPage')}}>
                                <Image source={SettingsIcon} style={styles.settingsIcon} />
                                <Text style={styles.optionText}>Dados da Conta</Text>
                                <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                            </Pressable>
                        </View>
                        <View style={styles.optionAccount}>
                            <Pressable style={styles.pressableOption} onPress={() => {navigation.navigate('PrivacityPage')}}>
                                <Image source={LockedIcon} style={styles.settingsIcon} />
                                <Text style={styles.optionText}>Privacidade</Text>
                                <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                            </Pressable>
                        </View>
                        <View style={styles.optionAccount}>
                            <Pressable style={styles.pressableOption} onPress={handleLogout}>
                                <Image source={ExitIcon} style={styles.settingsIcon} />
                                <Text style={styles.optionText}>Sair da Conta</Text>
                                <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                            </Pressable>
                        </View>
                    </View>
                )}
            
            
            
            <StatusBar style="auto" />
        </View>
    );
}

