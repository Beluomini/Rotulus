import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import styles from './styles';

import api from '../../services/Api';

import validator from 'validator';

import GoogleIcon from '../../assets/google_icon.png';
import XIcon from '../../assets/x-icon.png';
import EyeIcon from '../../assets/view-icon.png';
import EyeSlashIcon from '../../assets/hide-icon.png';


export default function RegisterPage({ navigation, route}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordIcon, setHidePasswordIcon] = useState(EyeIcon);

    const [usedEmail, setUsedEmail] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [weekPassword, setWeekPassword] = useState(false);

    const [emptyFields, setEmptyFields] = useState(false);

    function handleNameChange(name) {
        setName(name);
        setEmptyFields(false);
    }

    async function handleEmailChange(email) {

        setEmail(email);
        
        if (usedEmail || invalidEmail) {
            setUsedEmail(false);
            setInvalidEmail(false);
            setEmptyFields(false);
        }
    }

    function handlePasswordChange(password) {
        setPassword(password);
        if (weekPassword) {
            setWeekPassword(false);
            setEmptyFields(false);
        }
    }

    function handleHidePassword() {
        if (hidePassword) {
            setHidePasswordIcon(EyeSlashIcon);
        } else {
            setHidePasswordIcon(EyeIcon);
        }
        setHidePassword(!hidePassword);
    }

    async function register() {
        if (name == '' || email == '' || password == '') {
            setEmptyFields(true);
            console.log('campos vazios');
            return;
        }
        if (password.length < 8) {
            setWeekPassword(true);
            console.log('senha fraca');
            return;
        }
        const userExists = await api.getUserByEmail(email);
        if (userExists.email) {
            setUsedEmail(true);
            console.log('email ja cadastrado');
            return;
        }
        if(email != '' || email != null){
            if(!validator.isEmail(email)){
                setInvalidEmail(true);
                console.log('email invalido');
                return;
            }
        }
        const newUser = {
            name: name,
            email: email,
            password: password,
        }
        await api.createUser(newUser);
        navigation.navigate('LoginPage');
    }

    return (
        <View style={styles.container}>
            <View style={styles.page} >
                <View style={styles.title}>
                    <Text style={styles.titleText} >Crie uma conta</Text>
                </View>
                <View style={styles.inputData}>
                    
                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Nome</Text>
                        </View>
                        <TextInput 
                            style={styles.inputText} 
                            value={name}
                            onChangeText={handleNameChange}
                            placeholder="Digite seu nome"
                        />
                        <Pressable style={styles.inputButton} onPress={() => {setName('')}}>
                            <Image source={XIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Email</Text>
                        </View>
                        <TextInput
                            style={styles.inputText}
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="Digite seu email"
                        />
                        <Pressable style={styles.inputButton} onPress={() => {setEmail('')}}>
                            <Image source={XIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Senha</Text>
                        </View>
                        <TextInput
                            style={styles.inputText}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={hidePassword}
                            placeholder="Digite sua senha"
                        />
                        <Pressable style={styles.inputButton} onPress={handleHidePassword}>
                            <Image source={hidePasswordIcon} style={styles.inputButtonImage} />
                        </Pressable>
                    </View>

                    
                    {emptyFields && 
                        <View style={styles.inputError}>
                            <Text style={styles.inputErrorText}>Preencha todos os campos</Text>
                        </View>
                    }

                    {usedEmail &&
                        <View style={styles.inputError}>
                            <Text style={styles.inputErrorText}>Email já cadastrado</Text>
                        </View>
                    }

                    {invalidEmail &&
                        <View style={styles.inputError}>
                            <Text style={styles.inputErrorText}>Email inválido</Text>
                        </View>
                    }

                    {weekPassword &&
                        <View style={styles.inputError}>
                            <Text style={styles.inputErrorText}>Senha fraca (min 8 caracteres)</Text>
                        </View>
                    }

                </View>

                <View style={styles.submitButtons}>
                    <Pressable style={styles.button} onPress={() => {register()}}>
                        <Text style={styles.buttonText}>Criar uma conta</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => navigation.navigate('Prelogin')}>
                        <View style={styles.buttonGoogle}>
                            <Image style={styles.googleImage} source={GoogleIcon} />
                            <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
                        </View>                    
                    </Pressable>
                </View>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}

