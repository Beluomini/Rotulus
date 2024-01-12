import React, { useState, useEffect, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/Api';

import GlutenIcon from '../../assets/glutenIcon.png';
import UserIcon from '../../assets/user-icon.png';
import SearchIcon from '../../assets/search-icon.png';
import LactoseIcon from '../../assets/milk-icon.png';
import EggIcon from '../../assets/eggIcon.png';
import PeanutIcon from '../../assets/peanutIcon.png';

export default function HistoryPage({ navigation, route}) {

    const [isLoading, setLoading] = useState(true);

    const [userName, setUserName] = useState('');

    const [histList, setHistList] = useState([]);

    async function handleSearchFood(text) {
        if(text === ''){
            handleGetHistList();
        }else{
            // cria lista histListFiltered com todos os produtos que contem text no nome
            const histListFiltered = histList.filter((food) => {
                return food.name.includes(text);
            });
            setHistList(histListFiltered);
        }
    }

    async function handleGetPageData() {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);

        const userEmail = await AsyncStorage.getItem('userEmail');
        const userToken = await AsyncStorage.getItem('userToken');
        const user = await api.getUserByEmail(userEmail, userToken);
        if(user.statusCode !== 401){
            // add todas as comidas da lista de comidar user.foods na variavel histList
            const histList = await Promise.all(user.foods.map(async (food) => {
                const foodData = await api.getFoodById(food.foodId);
                return {...foodData, date: food.date};
            }));
            setHistList(histList);
        }
        setLoading(false);
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetPageData();    
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo(a){userName ? ', '+userName.split(' ')[0] : '!'}</Text>
                <Pressable onPress={() => {navigation.navigate('MenuPage')}}>
                    <Image style={styles.headerIcon} source={UserIcon} />
                </Pressable>
            </View>



            <View style={styles.page}>

                <Text style={styles.title}>Histórico</Text>

                <View style={styles.filter}>
                    <Image style={styles.filterIcon} source={SearchIcon} />
                    <TextInput 
                        style={styles.filterInput} 
                        placeholder='Digite o nome do produto'
                        onChangeText={text => handleSearchFood(text)}
                    />
                </View>

                {isLoading || !histList[0] ?
                    (
                        <Text style={{paddingTop:"60%"}}>Nenhum produto buscado ainda</Text>
                    )
                    : (
                        <View style={styles.listProductsView}>
                            <FlatList
                                style={styles.listProducts}
                                contentContainerStyle={{alignItems: 'center'}}
                                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                                data={histList}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => {
                                    return(
                                        <Pressable
                                            onPress={() => {navigation.navigate('ProductPage', {
                                                itemID: item.id,
                                            })}}
                                            style={styles.product}>
                                            <View style={styles.productImageBackground}>
                                                <Image style={styles.listProductsImage} source={{uri: item.image}} />
                                            </View>
                                            <View style={styles.productInfo}>
                                                <Text style={styles.productName}>{item.name+" "+item.brandName}</Text>
                                                <View style={styles.productInfoIcons}>
                                                    {
                                                        mapIngredients = item.ingredients.map((ingredient) => {
                                                            if (ingredient.ingredient.name === 'Trigo') {
                                                                return <Image style={styles.productInfoIcon} source={GlutenIcon} />
                                                            }
                                                            if (ingredient.ingredient.name === 'Leite') {
                                                                return <Image style={styles.productInfoIcon} source={LactoseIcon} />
                                                            }
                                                            if (ingredient.ingredient.name === 'Ovo') {
                                                                return <Image style={styles.productInfoIcon} source={EggIcon} />
                                                            }
                                                            if (ingredient.ingredient.name === 'Amendoim') {
                                                                return <Image style={styles.productInfoIcon} source={PeanutIcon} />
                                                            }
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        </Pressable>
                                    );
                                }}
                            />
                        </View>
                    )
                }

            </View>
            
            <StatusBar style="auto" />
        </View>
    );
}

