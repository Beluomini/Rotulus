import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/Api';

import GlutenIcon from '../../assets/glutenIcon.png';
import LactoseIcon from '../../assets/milk-icon.png';
import EggIcon from '../../assets/eggIcon.png';
import FilterIcon from '../../assets/filter-icon.png';
import UserIcon from '../../assets/user-icon.png';
import SearchIcon from '../../assets/search-icon.png';

export default function SearchPage({ navigation, route}) {

    const [isLoading, setLoading] = useState(true);

    const [userName, setUserName] = useState('');

    const [foods, setFoods] = useState([]);

    const [searchText, setSearchText] = useState('');

    const [isFiltering, setIsFiltering] = useState(false);
    const [classifications, setClassifications] = useState([]);
    const [selected, setSelected] = useState([]);

    async function handleSelectClassification() {
        if(selected.length === 0){
            if(searchText === ''){
                const foods = await api.getAllFoods();
                setFoods(foods);
            }else{
                const allFoods = await api.getFoodByName(searchText);
                setFoods(allFoods);
            }
        }else{
            if(searchText === ''){
                const allFoods = await api.getAllFoods();
                const foodsWhithClassification = await Promise.all(allFoods.map(async (food) => {
                    const classification = await api.getClassificationById(food.classificationId);
                    return {...food, classification: classification.name};
                }));
                const foodsFiltered = foodsWhithClassification.filter((food) => {
                    return selected.includes(food.classification);
                });
                setFoods(foodsFiltered);
            }else{
                const allFoods = await api.getFoodByName(searchText);
                const foodsWhithClassification = await Promise.all(allFoods.map(async (food) => {
                    const classification = await api.getClassificationById(food.classificationId);
                    return {...food, classification: classification.name};
                }));
                const foodsFiltered = foodsWhithClassification.filter((food) => {
                    return selected.includes(food.classification);
                });
                setFoods(foodsFiltered);
            }
            
        }
    }

    async function handleIsFiltering() {
        if(isFiltering){
            if(searchText === ''){
                const foods = await api.getAllFoods();
                setFoods(foods);
            }else{
                const foods = await api.getFoodByName(searchText);
                setFoods(foods);
            }
            setIsFiltering(false);
        }else{
            setIsFiltering(true);
        }
    }

    async function handleFoodSearch(text) {
        setSearchText(text);
        if (text === '') {
            const foods = await api.getAllFoods();
            const foodsWhithClassification = await Promise.all(foods.map(async (food) => {
                const classification = await api.getClassificationById(food.classificationId);
                return {...food, classification: classification.name};
            }));
            setFoods(foodsWhithClassification);
        }else{
            const foodsFiltered = await api.getFoodByName(text);
            const foodsWhithClassification = await Promise.all(foodsFiltered.map(async (food) => {
                const classification = await api.getClassificationById(food.classificationId);
                return {...food, classification: classification.name};
            }));
            setFoods(foodsWhithClassification);
        }
    }

    async function handleGetPageData() {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);

        const classifications = await api.getAllClassifications();
        const classificationList = classifications.map((classification) => {
            return {key: classification.id.toString(), value: classification.name.toString()};
        });
        setClassifications(classificationList);

        const foods = await api.getAllFoods();
        const foodsWhithClassification = await Promise.all(foods.map(async (food) => {
            const classification = await api.getClassificationById(food.classificationId);
            return {...food, classification: classification.name};
        }));
        setFoods(foodsWhithClassification);

        setLoading(false);
    }

    async function handleGetUserName() {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetUserName();    
        });
        handleGetPageData();
    
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
                    <Text style={styles.title}>Buscar Produtos</Text>

                    <View style={styles.filter}>
                        <Image style={styles.filterIcon} source={SearchIcon} />
                        <TextInput 
                            style={styles.filterInput} 
                            placeholder="Digite o nome do produto" 
                            value={searchText}
                            onChangeText={text => handleFoodSearch(text)} 
                            />
                        <Pressable onPress={handleIsFiltering}>
                            <Image style={styles.filterIcon} source={FilterIcon} />
                        </Pressable>
                    </View>
                    {isFiltering && (
                        <View style={styles.filterBox}>
                            <MultipleSelectList 
                                searchPlaceholder='Digite o ingrediente ou aditivo'
                                inputStyles={styles.classificationsInput}
                                setSelected={(val) => setSelected(val)} 
                                data={classifications} 
                                save="value"
                                fontFamily='Roboto'
                                onSelect={(select) => handleSelectClassification(select)} 
                                label="Componentes selecionados"
                        />
                        </View>
                    )}

                    {isLoading || !foods[0] ?
                        (
                            <View style={styles.page}>
                                <Text style={{paddingTop:"60%"}}>Nenhum produto encontrado</Text>
                            </View>
                        )
                        : (
                            <View style={styles.page}>    
                                <View style={styles.listProductsView}>
                                    <FlatList
                                        style={styles.listProducts}
                                        contentContainerStyle={{alignItems: 'center'}}
                                        ItemSeparatorComponent={() => <View style={{height: 10}} />}
                                        data={foods}
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
                                                                if (ingredient.ingredient.name === 'Ovo') {
                                                                    return <Image style={styles.productInfoIcon} source={EggIcon} />
                                                                }
                                                                if (ingredient.ingredient.name === 'Leite') {
                                                                    return <Image style={styles.productInfoIcon} source={LactoseIcon} />
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
                            </View>
                        )
                    }

                </View>
            
            <StatusBar style="auto" />
        </View>
    );
}

