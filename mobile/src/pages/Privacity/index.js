import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, Alert, Modal } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ArrowIcon from '../../assets/down-arrow-red-icon.png';
import LockedIcon from '../../assets/locked-icon.png';
import RemoveUserIcon from '../../assets/remove-user-icon.png';

import api from '../../services/Api';

export default function PrivacityPage({ navigation, route}) {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    async function handleDeletarConta() {

        console.log('Deletar conta');

        try {
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');

            setModalVisible(!modalVisible);
            
            await AsyncStorage.multiRemove(['userToken', 'userId', 'userName', 'userEmail', 'userStatus']);
            setUserName('');
            setUserEmail('');

            await api.editUserById(userId, {status: 'inactive'}, userToken);
            
            navigation.navigate('StartPage');
        }
        catch(error) {
            console.log(error);
        }

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

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Excluir conta</Text>
                        <Text style={styles.modalText}>Sua conta será desativada e excluída em 30 dias caso não haja login durante esse tempo</Text>
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyleBlack}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={styles.buttonOk} onPress={handleDeletarConta}>
                                <Text style={styles.textStyleRed}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.loggedOptions}>
                <View style={styles.optionAccount}>
                    <Pressable style={styles.pressableOption} onPress={() => {navigation.navigate('ChangePassPage')}}>
                        <Image source={LockedIcon} style={styles.settingsIcon} />
                        <Text style={styles.optionText}>Senha</Text>
                        <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                    </Pressable>
                </View>
                <View style={styles.optionAccount}>
                    <Pressable style={styles.pressableOption} onPress={() => {setModalVisible(true)}}>
                        <Image source={RemoveUserIcon} style={styles.settingsIcon} />
                        <Text style={styles.optionText}>Deletar Conta</Text>
                        <Image source={ArrowIcon} style={styles.arrowOptionIcon} />
                    </Pressable>
                </View>
            </View>
            
            <StatusBar style="auto" />
        </View>
    );
}

