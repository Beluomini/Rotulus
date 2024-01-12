import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/Api';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ArrowIcon from '../../assets/down-arrow-white-icon.png';
import UserIcon from '../../assets/user-icon.png';
import EditIcon from '../../assets/edit-icon.png';

export default function AccountPage({ navigation, route}) {

    const [isSaved, setSaved] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isSearching, setSearching] = useState(false);

    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');
    const [userName, setUserName] = useState('Nome do Usuário');
    const [userEmail, setUserEmail] = useState('Email do Usuário');

    const [editableName, setEditableName] = useState(false);

    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [newAlergies, setNewAlergies] = useState([]);

    handleSelectIngredient = async (item) => {
        const newSelectedIngredients = [...selectedIngredients, item];
        setSelectedIngredients(newSelectedIngredients);


        const newIngredients = ingredients.filter((ingredient) => {
            return ingredient.key !== item.key;
        });
        setIngredients(newIngredients);
        setSaved(false);
    }

    handleRemoveIngredient = (id) => {
        const newIngredients = [...ingredients, id];
        setIngredients(newIngredients);

        const newSelectedIngredients = selectedIngredients.filter((ingredient) => {
            return ingredient.key !== id.key;
        });
        setSelectedIngredients(newSelectedIngredients);
        setSaved(false);
    }

    handleSeachIngredient = async (text) => {
        if(text !== '') {
            const apiresult = await api.getIngredientByName(text);
            const newIngredients = apiresult.map((item) => {
                return {key: item.id, value: item.name};
            });
            setIngredients(newIngredients);
        }else{
            const ingredients = await api.getAllIngredients();
            const ingredientsSelector = ingredients.map((item) => {
                return {key: item.id, value: item.name};
            });
            setIngredients(ingredientsSelector);
        }
    }

    handleChangeName = (text) => {
        setUserName(text);
        setSaved(false);
    }

    handleSaveData = async () => {
        const user = await api.getUserById(userId, userToken);

        const newAlergies = selectedIngredients.map((item) => {
            return item.key;
        });

        const updatedUser = {
            name: userName,
            ingredientAlergies: newAlergies,
        }

        const newUser = await api.editUserAlergById(userId, updatedUser, userToken);

        setSaved(true);
    }
    
    handleGetPageData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');

        const user = await api.getUserById(userId, userToken);
        setUserId(user.id);
        setUserName(user.name);
        setUserEmail(user.email);
        setUserToken(userToken);
        
        const userIngredients = user.ingredientAlergies;
        const userIngredientsSelector = userIngredients.map((item) => {
            return {key: item.ingredient.id, value: item.ingredient.name};
        });
        setSelectedIngredients(userIngredientsSelector);

        const ingredients = await api.getAllIngredients();
        const ingredientsSelector = ingredients.map((item) => {
            return {key: item.id, value: item.name};
        });
        if(userIngredientsSelector.length > 0) {
            userIngredientsSelector.forEach((item) => {
                const newIngredientsSelector = ingredientsSelector.filter((ingredient) => {
                    return ingredient.key !== item.key;
                });
                setIngredients(newIngredientsSelector);
            });
        }else{
            setIngredients(ingredientsSelector);
        }

        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetPageData();
        });
        handleGetPageData();
    
        return unsubscribe;
    }, [navigation]);



    return (
        <SafeAreaView style={styles.all}>
        {
            isLoading ? (
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Carregando...</Text>
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        
                        <View style={styles.header}>
                            <Pressable style={styles.arrowIconButton} onPress={() => {navigation.goBack()}}>
                                <Image source={ArrowIcon} style={styles.arrowIcon} />
                            </Pressable>
                            <Text style={styles.title}>Dados da Conta</Text>
                            <Image source={UserIcon} style={styles.userIcon} />
                                {
                                    editableName ? (
                                        <View style={styles.userName}>
                                            <TextInput style={styles.userNameInput} onEndEditing={() => {setEditableName(false)}} onChangeText={text => handleChangeName(text)} value={userName} />
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
                            {selectedIngredients.length == 0 && (
                                <View style={styles.noAlergies}>
                                    <Text style={styles.noAlergiesText} >Sem alergias ou intolerâncias</Text>
                                </View>
                            )}
                            <View style={styles.alergiesBoxesSelected}>
                                {selectedIngredients.length > 0 && (
                                    selectedIngredients.map((item, index) => {
                                        return (
                                            <Pressable 
                                                style={styles.alergiesBoxSelected} 
                                                key={index}
                                                onPress={() => handleRemoveIngredient(item)}
                                                >
                                                <Text style={styles.alergiesBoxSelectedText}>{item.value}</Text>
                                                <Icon name="close" size={20} color="#fff" />
                                            </Pressable>
                                        )
                                    })
                                )}
                            </View> 
                            <View style={styles.alergiesSearchLabel}>
                                <TextInput 
                                    style={styles.alergiesSearchInput}
                                    placeholder="Buscar Ingredientes"
                                    placeholderTextColor="#000"
                                    onChangeText={text => handleSeachIngredient(text)}
                                    onFocus={() => {setSearching(true)}}
                                />
                                {isSearching ? (
                                    <Pressable onPress={() => {setSearching(false)}}>
                                        <Icon name="close" size={20} color="#000" />
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => {setSearching(true)}}>
                                        <Icon name="chevron-down" size={30} color="#000" />
                                    </Pressable>
                                )}
                            </View>
                            <ScrollView style={styles.alergiesBox}>
                                {isSearching && (
                                        ingredients.map((item, index) => {
                                            return (
                                                <Pressable 
                                                    style={styles.alergiesBoxItem} 
                                                    key={index}
                                                    onPress={() => handleSelectIngredient(item)}
                                                    >
                                                    <Text style={styles.alergiesBoxItemText}>{item.value}</Text>
                                                </Pressable>
                                            )
                                        })
                                    )
                                }
                            </ScrollView>

                            <View style={styles.alergiesButtons}>
                                {isSaved ? (
                                    <Pressable style={styles.buttonSaved} disabled>
                                        <Text style={styles.buttonSavedText}>Salvar</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable style={styles.buttonSave} onPress={handleSaveData}>
                                        <Text style={styles.buttonSaveText}>Salvar</Text>
                                    </Pressable>
                                )}
                            </View>
                                                      
                        </View>

                        
                        <StatusBar style="auto" />
                    </View>
                </ScrollView>
            )
        }
        </SafeAreaView>
    );
}

