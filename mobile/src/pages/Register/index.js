import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput } from 'react-native';
import styles from './styles';

import google_icon from '../../assets/google_icon.png';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function WelcomePage({ navigation, route}) {

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
                        <TextInput style={styles.inputText} placeholder="Digite seu nome" />
                        <Pressable style={styles.inputButton} onPress={() => navigation.navigate('Prelogin')}>
                            <Icon name="times-circle-o" size={28} color="#D33333" />
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Email</Text>
                        </View>
                        <TextInput style={styles.inputText} placeholder="Digite seu email" />
                        <Pressable style={styles.inputButton} onPress={() => navigation.navigate('Prelogin')}>
                            <Icon name="times-circle-o" size={28} color="#D33333" />
                        </Pressable>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputDetail}>
                            <Text style={styles.inputDetailText}>Senha</Text>
                        </View>
                        <TextInput style={styles.inputText} placeholder="Crie uma senha" />
                        <Pressable style={styles.inputButton} onPress={() => navigation.navigate('Prelogin')}>
                            <Icon name="times-circle-o" size={28} color="#D33333" />
                        </Pressable>
                    </View>

                </View>

                <Pressable style={styles.button} onPress={() => navigation.navigate('Prelogin')}>
                    <Text style={styles.buttonText}>Criar uma conta</Text>
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

