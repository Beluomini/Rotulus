import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/Api';

import google_icon from '../../assets/google_icon.png';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function WelcomePage({ navigation, route}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordIcon, setHidePasswordIcon] = useState('eye');

    const [userNotFound, setUserNotFound] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    async function handleLogin() {
        const response = await api.signIn({email, password});
        if (response.error) {
            console.log(response.message);
            setUserNotFound(true);
            return;
        }else{

            await AsyncStorage.setItem('userToken', response.access_token);
            await AsyncStorage.setItem('userId', response.user.id);
            await AsyncStorage.setItem('userName', response.user.name);
            await AsyncStorage.setItem('userEmail', response.user.email);
            await AsyncStorage.setItem('userStatus', response.user.status);

            navigation.navigate('HomePage');
        }
    }  

    function handleEmailChange(email) {
        if (userNotFound) {
            setUserNotFound(false);
        }
        setEmail(email);
    }

    function handlePasswordChange(password) {
        if (wrongPassword) {
            setWrongPassword(false);
        }
        setPassword(password);
    }

    function handleHidePassword() {
        if (hidePassword) {
            setHidePasswordIcon('eye-slash');
        } else {
            setHidePasswordIcon('eye');
        }
        setHidePassword(!hidePassword);
    }

    return (
        <View style={styles.container}>
            <View style={styles.page} >
                <View style={styles.title}>
                    <Text style={styles.titleText} >Estre na sua conta</Text>
                </View>
                <View style={styles.inputData}>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Email</Text>
                        </View>
                        <TextInput 
                            onChangeText={email => handleEmailChange(email)} 
                            style={styles.inputText} 
                            value={email}
                            placeholder="Digite seu email" 
                        />

                        <Pressable style={styles.inputButton} onPress={() => {setEmail('')}}>
                            <Icon name="times-circle-o" size={28} color="#D33333" />
                        </Pressable>
                    </View>

                    {userNotFound && 
                        <View style={styles.inputError}> 
                            <Text style={styles.inputErrorText}>Usuário não encontrado</Text>
                        </View>
                    }
                        

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Senha</Text>
                        </View>
                        <TextInput 
                            onChangeText={password => handlePasswordChange(password)}
                            style={styles.inputText}
                            value={password}
                            secureTextEntry={hidePassword}
                            placeholder="Digite sua senha"
                        />
                        
                        <Pressable style={styles.inputButton} onPress={handleHidePassword} >
                            <Icon name={hidePasswordIcon} size={28} color="#D33333" />
                        </Pressable>
                    </View>

                    {wrongPassword &&
                        <View style={styles.inputError}> 
                            <Text style={styles.inputErrorText}>Senha incorreta</Text>
                        </View>
                    }

                    <View style={styles.inputForgot}>
                        <Pressable style={styles.inputForgotButton} onPress={() => navigation.navigate('Prelogin')}>
                            <Text style={styles.inputForgotText}>Esqueci minha senha</Text>
                        </Pressable>
                    </View>


                </View>

                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => navigation.navigate('Prelogin')}>
                    <View style={styles.buttonGoogle}>
                        <Image style={styles.googleImage} source={google_icon} />
                        <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
                    </View>                    
                </Pressable>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}

