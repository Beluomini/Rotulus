import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import styles from './styles';

import api from '../../services/Api';

import validator from 'validator';

import google_icon from '../../assets/google_icon.png';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function WelcomePage({ navigation, route}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                            <Icon name="times-circle-o" size={28} color="#D33333" />
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
                            <Icon name="times-circle-o" size={28} color="#D33333" />
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
                            secureTextEntry={true}
                            placeholder="Digite sua senha"
                        />
                        <Pressable style={styles.inputButton} onPress={() => {setPassword('')}}>
                            <Icon name="times-circle-o" size={28} color="#D33333" />
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
                            <Image style={styles.googleImage} source={google_icon} />
                            <Text style={styles.buttonGoogleText}>Entrar com Google</Text>
                        </View>                    
                    </Pressable>
                </View>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}

