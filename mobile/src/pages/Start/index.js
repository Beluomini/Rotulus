import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';

import frozen_food from '../../assets/frozen_food.png';

export default function StartPage({ navigation, route}) {

    return (
        <View style={styles.container}>
            <View  style={styles.page}>
                <View style={styles.image}>
                    <Image source={frozen_food} />
                </View>
                <Text style={styles.title} >Cadastre-se para começar</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterPage')}>
                    <Text style={styles.buttonText}>Criar uma conta</Text>
                </Pressable>
                <Pressable style={styles.link} onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={styles.linkText}>Já tenho uma conta</Text>
                </Pressable>
                <Pressable style={styles.linkJump} onPress={() => navigation.navigate('TabApp')}>
                    <Text style={styles.linkText}>Pular</Text>
                </Pressable>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

