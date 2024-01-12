import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import styles from './styles';

import api from '../../services/Api';

import PagerView from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlutenIcon from '../../assets/glutenIcon.png';
import EggIcon from '../../assets/eggIcon.png';
import MilkIcon from '../../assets/milk-icon.png';
import PeanutIcon from '../../assets/peanutIcon.png';

import UserIcon from '../../assets/user-icon.png';
import RotulusSplash from '../../assets/start-splash.png';

export default function HomePage({ navigation, route}) {

    const [isLoading, setLoading] = useState(true);

    const [userName, setUserName] = useState('');

    const [foods, setFoods] = useState([]);
    const [lastThreeFoods, setLastThreeFoods] = useState([]);

    const [circle1style, setCircle1Style] = useState(styles.circleFull);
    const [circle2style, setCircle2Style] = useState(styles.circleEmpty);
    const [circle3style, setCircle3Style] = useState(styles.circleEmpty);

    function handlePageChange(page) {
        if (page === 0) {
            setCircle1Style(styles.circleFull);
            setCircle2Style(styles.circleEmpty);
            setCircle3Style(styles.circleEmpty);
        }else if (page === 1) {
            setCircle1Style(styles.circleEmpty);
            setCircle2Style(styles.circleFull);
            setCircle3Style(styles.circleEmpty);
        }else{
            setCircle1Style(styles.circleEmpty);
            setCircle2Style(styles.circleEmpty);
            setCircle3Style(styles.circleFull);
        }
    }


    handleGetPageData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);

        const foods = await api.getAllFoods();
        const usedFoods = foods.slice(0, -3);
        const foodsWhithClassification = await Promise.all(usedFoods.map(async (food) => {
            const classification = await api.getClassificationById(food.classificationId);
            return {...food, classification: classification.name};
        }));
        setFoods(foodsWhithClassification);
        const lastThreeFoods = foods.slice(-3);
        setLastThreeFoods(lastThreeFoods);
        setLoading(false);
    }

    handleGetUserName = async () => {
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
            {isLoading ? 
                    <Image source={RotulusSplash} style={{width: '100%', height: '100%'}} /> 
                    : (

            <View style={styles.allData}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bem-vindo(a){userName ? ', '+userName.split(' ')[0] : '!'}</Text>
                    <Pressable onPress={() => {navigation.navigate('MenuPage')}}>
                        <Image style={styles.headerIcon} source={UserIcon} />
                    </Pressable>
                </View>
                <View style={styles.page}>

                    <Text style={styles.title}>Produtos Populares</Text>
                    <View style={styles.bigProduct}>
                        <PagerView style={styles.viewPager} initialPage={0} onPageSelected={e => {handlePageChange(e.nativeEvent.position)}}>   
                            <View key="1">
                                <Pressable onPress={() => {navigation.navigate('ProductPage', {
                                    itemID: lastThreeFoods[0]["id"],
                                })}}> 
                                    <Image style={styles.bigProductImage} source={{uri: lastThreeFoods[0]["image"]}} />
                                </Pressable>
                            </View>
                            <View key="2">
                                <Pressable onPress={() => {navigation.navigate('ProductPage', {
                                    itemID: lastThreeFoods[1]["id"],
                                })}}> 
                                    <Image style={styles.bigProductImage} source={{uri: lastThreeFoods[1]["image"]}} />
                                </Pressable>
                            </View>
                            <View key="3">
                                <Pressable onPress={() => {navigation.navigate('ProductPage', {
                                    itemID: lastThreeFoods[2]["id"],
                                })}}>
                                    <Image style={styles.bigProductImage} source={{uri: lastThreeFoods[2]["image"]}} />
                                </Pressable>
                            </View>
                        </PagerView>
                        <View style={styles.circles}>
                            <View style={circle1style} />
                            <View style={circle2style} />
                            <View style={circle3style} />
                        </View>
                    </View>

                    <View style={styles.listProductsView}>
                        <FlatList
                            style={styles.listProducts}
                            columnWrapperStyle={{justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: "5%"}}
                            contentContainerStyle={{alignItems: 'center'}}
                            data={foods}
                            numColumns={3}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                return(
                                    <Pressable style={styles.product}
                                    onPress={() => {navigation.navigate('ProductPage', {
                                        itemID: item.id,
                                    })}}>
                                        <View style={styles.productImageBackground}>
                                            <Image style={styles.listProductsImage} source={{uri: item.image}} />
                                        </View>
                                        <View style={styles.productIconsInfo}>
                                        {
                                        mapIngredients = item.ingredients.map((ingredient) => {
                                            if (ingredient.ingredient.name === 'Trigo') {
                                                return <Image style={styles.productInfoIcon} source={GlutenIcon} />
                                            }
                                            if (ingredient.ingredient.name === 'Ovo') {
                                                return <Image style={styles.productInfoIcon} source={EggIcon} />
                                            }
                                            if (ingredient.ingredient.name === 'Leite') {
                                                return <Image style={styles.productInfoIcon} source={MilkIcon} />
                                            }
                                            if (ingredient.ingredient.name === 'Amendoim') {
                                                return <Image style={styles.productInfoIcon} source={PeanutIcon} />
                                            }

                                        })
                                        }
                                        </View>
                                        <View style={styles.productNameInfo}>
                                            <Text style={styles.productName}>{item.description}</Text>
                                        </View>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>

                </View>
            </View>

            )}

            <StatusBar style="auto" />
        </View>
    );
}

