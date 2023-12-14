import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

import AsyncStorage from '@react-native-async-storage/async-storage';

import ArrowIcon from '../../assets/down-arrow-white-icon.png';
import UserIcon from '../../assets/user-icon.png';
import EditIcon from '../../assets/edit-icon.png';

export default function AccountPage({ navigation, route}) {

    const [userId, setUserId] = useState('');

    const [userName, setUserName] = useState('Nome do Usuário');
    const [editableName, setEditableName] = useState(false);

    const [userEmail, setUserEmail] = useState('Email do Usuário');

    const [selected, setSelected] = useState([]);
  
    const ingredients = [
        {key: '1', value: 'Glúten'},
        {key: '2', value: 'Lactose'},
        {key: '3', value: 'Ovo'},
        {key: '4', value: 'Amendoim'},
        {key: '5', value: 'Soja'},
        {key: '6', value: 'Peixe'},
        {key: '7', value: 'Frutos do mar'},
        {key: '8', value: 'Gergelim'},
        {key: '9', value: 'Castanhas'},
        {key: '10', value: 'Nozes'},
    ]

    handleSelectIngredient = () => {
        console.log(selected)
    }

    handleGoBackAndSave = () => {
        navigation.goBack();
    }

    handleRecoverUserData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userName = await AsyncStorage.getItem('userName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        setUserId(userId);
        setUserName(userName);
        setUserEmail(userEmail);
    }

    useEffect(() => {
        handleRecoverUserData();
    }, []);


    return (
        <SafeAreaView style={styles.all}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable style={styles.arrowIconButton} onPress={handleGoBackAndSave}>
                            <Image source={ArrowIcon} style={styles.arrowIcon} />
                        </Pressable>
                        <Text style={styles.title}>Dados da Conta</Text>
                        <Image source={UserIcon} style={styles.userIcon} />
                            {
                                editableName ? (
                                    <View style={styles.userName}>
                                        <TextInput style={styles.userNameInput} onEndEditing={() => {setEditableName(false)}} onChangeText={text => setUserName(text)} value={userName} />
                                    </View>
                                ) : (
                                    <View style={styles.userName}>
                                        <Text style={styles.userNameText}>{userName}</Text>
                                        <Pressable style={styles.editIconButton} onPress={() => {setEditableName(true)}}>
                                            <Image source={EditIcon} style={styles.editIcon} />
                                        </Pressable>
                                    </View>
                                )
                            }
                        <Text style={styles.email}>{userEmail}</Text>
                    </View>
                    
                    <View style={styles.alergies}>
                        <Text style={styles.alergiesTitle}>Minhas alergias/intolerâncias</Text>
                        <View style={styles.alergiesBox}>
                            <MultipleSelectList 
                                searchPlaceholder='Digite o ingrediente ou aditivo'
                                inputStyles={styles.alergiesInput}
                                setSelected={(val) => setSelected(val)} 
                                data={ingredients} 
                                save="value"
                                fontFamily='Roboto'
                                onSelect={() => handleSelectIngredient()} 
                                label="Componentes selecionados"
                        />
                        </View>
                    </View>
                    
                    <StatusBar style="auto" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

