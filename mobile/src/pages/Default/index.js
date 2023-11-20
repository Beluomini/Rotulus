import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';
import styles from './styles';

export default function WelcomePage({ navigation, route}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Tela Padrão</Text>
            <Text style={styles.texto} >Use essa tela como modelo pra outras</Text>
            <StatusBar style="auto" />
        </View>
    );
}

