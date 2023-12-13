import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput, ToastAndroid } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/Api';

import XIcon from '../../assets/x-icon.png';

export default function ChangePassPage({ navigation, route}) {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [wrongPassword, setWrongPassword] = useState(false);
    const [samePassword, setSamePassword] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(true);
 

    function handlePassChange(password) {
        if (wrongPassword) {
            setWrongPassword(false);
        }
        setPassword(password);
    }

    function handleNewPassChange(newPassword) {
        if (samePassword) {
            setSamePassword(false);
        }
        if (!validNewPassword) {
            setValidNewPassword(true);
        }
        setNewPassword(newPassword);
    }

    function handlePassConfirmChange(passwordConfirm) {
        if (!validNewPassword) {
            setValidNewPassword(true);
        }
        setPasswordConfirm(passwordConfirm);
    }

    async function handleChangePassword() {

        if (password === newPassword) {
            setSamePassword(true);
            return;
        }
        if (passwordConfirm !== newPassword) {
            setValidNewPassword(false);
            return;
        }
        setSamePassword(false);
        setValidNewPassword(true);

        const email = await AsyncStorage.getItem('userEmail');

        const response = await api.signIn({email, password});

        if (response.statusCode === 401) {
            setWrongPassword(true);
            return;
        }

        const userId = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');

        await api.editUserById(userId, {password: passwordConfirm}, userToken);

        setPassword('');
        setNewPassword('');
        setPasswordConfirm('');
        
        ToastAndroid.show('Senha alterada!', ToastAndroid.SHORT);

        navigation.navigate('TabApp');
    }

    return (
        <View style={styles.container}>
            <View style={styles.page} >
                <View style={styles.title}>
                    <Text style={styles.titleText} >Alterar senha</Text>
                </View>
                <View style={styles.inputData}>

                    <Text style={styles.inputDataText}>Para alterar sua senha, informe sua senha anterior e a que deseja cadastrar.</Text>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Senha atual</Text>
                        </View>
                        <TextInput 
                            onChangeText={passowrd => handlePassChange(passowrd)} 
                            style={styles.inputText} 
                            value={password}
                            placeholder="Digite seu email" 
                        />

                        <Pressable style={styles.inputButton} onPress={() => {setPassword('')}}>
                            <Image source={XIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>
                    

                    <View style={styles.inputForgot}>
                        <Pressable style={styles.inputForgotButton} onPress={() => navigation.navigate('StartPage')}>
                            <Text style={styles.inputForgotText}>Esqueci minha senha</Text>
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Nova senha</Text>
                        </View>
                        <TextInput 
                            onChangeText={newPassword => handleNewPassChange(newPassword)} 
                            style={styles.inputText} 
                            value={newPassword}
                            placeholder="Digite seu email" 
                        />

                        <Pressable style={styles.inputButton} onPress={() => {setNewPassword('')}}>
                            <Image source={XIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Nova senha</Text>
                        </View>
                        <TextInput 
                            onChangeText={passwordConfirm => handlePassConfirmChange(passwordConfirm)} 
                            style={styles.inputText} 
                            value={passwordConfirm}
                            placeholder="Digite seu email" 
                        />

                        <Pressable style={styles.inputButton} onPress={() => {setPasswordConfirm('')}}>
                            <Image source={XIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>

                    {samePassword && 
                        <View style={styles.inputError}> 
                            <Text style={styles.inputErrorText}>Nova senha igual senha atual</Text>
                        </View>
                    }

                    {!validNewPassword &&
                        <View style={styles.inputError}>
                            <Text style={styles.inputErrorText}>Nova senha não confere</Text>
                        </View>
                    }
                        

                    {wrongPassword &&
                        <View style={styles.inputError}> 
                            <Text style={styles.inputErrorText}>Senha atual incorreta</Text>
                        </View>
                    }


                </View>

                <Pressable style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}

