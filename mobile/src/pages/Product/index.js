import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ScrollView } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/Api';

import UserIcon from '../../assets/user-icon.png';
import ArrowIcon from '../../assets/down-arrow-red-icon.png';
import WarningIcon from '../../assets/warning-icon.png';
import GlutenIcon from '../../assets/glutenIcon.png';
import MilkIcon from '../../assets/milk-icon.png';
import EggIcon from '../../assets/eggIcon.png';

export default function ProductPage({ navigation, route}) {

    const [isLoading, setLoading] = useState(true);

    const [userName, setUserName] = useState('');
    const [item, setItem] = useState({});
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [histProducts, setHistProducts] = useState([]);

    const [arrowGlutenStyle, setArrowGlutenStyle] = useState(styles.itemAdicionalDetImageDown);
    const [arrowLactoseStyle, setArrowLactoseStyle] = useState(styles.itemAdicionalDetImageDown);
    const [arrowEggStyle, setArrowEggStyle] = useState(styles.itemAdicionalDetImageDown);

    const [glutenDetails, setGlutenDetails] = useState(false);
    const [lactoseDetails, setLactoseDetails] = useState(false);
    const [eggDetails, setEggDetails] = useState(false);

    function handleGlutenDetails() {
        setArrowGlutenStyle(arrowGlutenStyle === styles.itemAdicionalDetImageDown ? styles.itemAdicionalDetImageUp : styles.itemAdicionalDetImageDown);
        setGlutenDetails(!glutenDetails);
    }
    function handleLactoseDetails() {
        setArrowLactoseStyle(arrowLactoseStyle === styles.itemAdicionalDetImageDown ? styles.itemAdicionalDetImageUp : styles.itemAdicionalDetImageDown);
        setLactoseDetails(!lactoseDetails);
    }
    function handleEggDetails() {
        setArrowEggStyle(arrowEggStyle === styles.itemAdicionalDetImageDown ? styles.itemAdicionalDetImageUp : styles.itemAdicionalDetImageDown);
        setEggDetails(!eggDetails);
    }

    handleSelectRecommendedProduct = async (id) => {
        setLoading(true);
        // espera 1 segundo com a tela de carregamento
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        handleGetPageData(id);
    }

    handleGetPageData = async (itemID) => {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);

        const item = await api.getFoodById(itemID);
        setItem(item);

        const allFoods = await api.getAllFoods();
        // remove o item atual da lista de produtos recomendados
        const filteredFoods = allFoods.filter(food => food.id !== itemID);
        // seleciona dois alimentos com a mesma classificação do item atual
        const recommendedProducts = filteredFoods.filter(food => food.classificationId === item.classificationId).slice(0, 2);
        // busca a classificação dos alimentos recomendados
        const recommendedProductsWithClassification = await Promise.all(recommendedProducts.map(async (food) => {
            const classification = await api.getClassificationById(food.classificationId);
            return {...food, classification: classification.name};
        }));
        setRecommendedProducts(recommendedProductsWithClassification);
        setLoading(false);
    }

    async function handleGetHistList(itemId) {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userToken = await AsyncStorage.getItem('userToken');

        const user = await api.getUserByEmail(userEmail, userToken);

        if(user.statusCode !== 401){
            // add todas os ids das comidas da lista de comidar user.foods e adiciona na variavel histProducts
            const histProducts = user.foods ? 
                await Promise.all(user.foods.map(async (food) => {
                    const foodData = await api.getFoodById(food.foodId);
                    return foodData.id;
                }))
                : [];
            setHistProducts(histProducts);
            
            const userUpdate = {...user, foodsHist: [...histProducts, itemId]};

            const response = await api.editUserById(user.id, userUpdate, userToken);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetHistList(route.params.itemID);
        });
        handleGetPageData(route.params.itemID);
    
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

            {isLoading ?
                (
                <View style={styles.page}>
                    <View style={styles.back} >
                        <Pressable onPress={() => {navigation.goBack()}}>
                            <Image source={ArrowIcon} style={styles.backIcon} />
                        </Pressable>
                    </View>
                    <Text style={{paddingTop:"60%"}}>Carregando...</Text>
                </View>
                )
                : (
                <View style={styles.page}>
                    <View style={styles.back} >
                        <Pressable onPress={() => {navigation.goBack()}}>
                            <Image source={ArrowIcon} style={styles.backIcon} />
                        </Pressable>
                    </View>
                    <View style={styles.itemPrincipals}>
                        <View style={styles.itemPrincipalImageBack}>
                            <Image style={styles.itemPrincipalImage} source={{uri: item.image}} />
                        </View>
                        <View style={styles.itemPrincipalText}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.itemDetailsScroll}>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemDetailsText}> Este produto possui ingredientes alergênicos </Text>

                            <View style={styles.itemAdicionalInfo}>
                                <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                <View style={styles.itemAdicionalDetailsText}>
                                    <View style={styles.itemAdicionalDetailsTitle}>
                                        <Text style={styles.itemAdicionalTitle}> Contém glutén. </Text>
                                        <Image style={styles.itemAdicionalIcon} source={GlutenIcon} />
                                    </View>
                                    <View style={styles.itemAdicionalDetails}>
                                        <Pressable onPress={handleGlutenDetails}>
                                            <Image style={arrowGlutenStyle} source={ArrowIcon} />
                                        </Pressable>
                                        <Text style={styles.itemAdicionalText}>Saiba o que o glutén em excesso pode causar ao organismo.</Text>
                                    </View>
                                </View>
                            </View>

                            {glutenDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> O glutén é uma proteína presente no trigo, centeio, cevada e aveia. O glutén é uma proteína presente no trigo, centeio, cevada e aveia. O glutén é uma proteína presente no trigo, centeio, cevada e aveia. O glutén é uma proteína presente no trigo, centeio, cevada e aveia. O glutén é uma proteína presente no trigo, centeio, cevada e aveia. O glutén é uma proteína presente no trigo, centeio, cevada e aveia. </Text>
                            </View>
                            }

                            <View style={styles.itemAdicionalInfo}>
                                <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                <View style={styles.itemAdicionalDetailsText}>
                                    <View style={styles.itemAdicionalDetailsTitle}>
                                        <Text style={styles.itemAdicionalTitle}> Contém lactose. </Text>
                                        <Image style={styles.itemAdicionalIcon} source={MilkIcon} />
                                    </View>
                                    <View style={styles.itemAdicionalDetails}>
                                        <Pressable onPress={handleLactoseDetails}>
                                            <Image style={arrowLactoseStyle} source={ArrowIcon} />
                                        </Pressable>
                                        <Text style={styles.itemAdicionalText}>Saiba o que a lactose em excesso pode causar ao organismo.</Text>
                                    </View>
                                </View>
                            </View>

                            {lactoseDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. </Text>
                            </View>
                            }

                            <View style={styles.itemAdicionalInfo}>
                                <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                <View style={styles.itemAdicionalDetailsText}>
                                    <View style={styles.itemAdicionalDetailsTitle}>
                                        <Text style={styles.itemAdicionalTitle}> Contém ovos. </Text>
                                        <Image style={styles.itemAdicionalIcon} source={EggIcon} />
                                    </View>
                                    <View style={styles.itemAdicionalDetails}>
                                        <Pressable onPress={handleEggDetails}>
                                            <Image style={arrowEggStyle} source={ArrowIcon} />
                                        </Pressable>
                                        <Text style={styles.itemAdicionalText}>Saiba o que ovos em excesso pode causar ao organismo.</Text>
                                    </View>
                                </View>
                            </View>

                            {eggDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. </Text>
                            </View>
                            }

                            <View style={styles.itemNutricionalFacts}>
                                <Text style={styles.itemNutricionalFactsTitle}> Informações nutricionais </Text>
                                <View style={styles.itemNutricionalFactsData}>
                                    <View style={styles.itemNutricionalFactsDataViewServing}>
                                        <Text style={styles.itemNutricionalFactsDataServing}> Porção </Text>
                                        <Text style={styles.itemNutricionalFactsDataServing}> {item.servingSize} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Valor energético </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.energyValue} kcal </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Carboidratos </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.carbohydrate} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Açucares totais </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.totalSugar} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Açucares adicionados </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.addedSugar} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Proteínas </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.protein} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Gorduras totais </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.totalFat} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Gorduras saturadas </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.saturatedFat} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Gorduras trans </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.transFat} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Fibras alimentares </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.fiber} g </Text>
                                    </View>
                                    <View style={styles.itemNutricionalFactsDataView}>
                                        <Text style={styles.itemNutricionalFactsDataText}> Sódio </Text>
                                        <Text style={styles.itemNutricionalFactsDataText}> {item.sodium} g </Text>
                                    </View>
                                </View>
                            </View>

                            {recommendedProducts[0] && 
                            
                                (<View style={styles.recommendedView}>
                                    <Text style={styles.recommendedText}> Recomendados para você </Text>
                                    <View style={styles.recommendedProducts}>
                                        {recommendedProducts[0] && recommendedProducts[0].image &&
                                            (<Pressable 
                                            style={styles.recommendedProductsData}
                                            onPress={() => {handleSelectRecommendedProduct(recommendedProducts[0].id)}}>
                                                <View style={styles.recommendedProductsImageBack}>
                                                    <Image style={styles.recommendedProductsImage} source={{uri: recommendedProducts[0].image}} />
                                                </View>
                                                <View style={styles.recommendedProductsIcon}>
                                                    <Image style={styles.recommendedProductsIconData} source={GlutenIcon} />
                                                </View>
                                                <View style={styles.recommendedProductsText}>
                                                    <Text style={styles.recommendedProductsName}>{recommendedProducts[0].classification+" "+ recommendedProducts[0].brandName}</Text>
                                                </View>
                                            </Pressable>)
                                        }
                                        {recommendedProducts[1] && recommendedProducts[1].image &&

                                            (<Pressable 
                                            style={styles.recommendedProductsData}
                                            onPress={() => {handleSelectRecommendedProduct(recommendedProducts[1].id)}}>
                                                <View style={styles.recommendedProductsImageBack}>
                                                    <Image style={styles.recommendedProductsImage} source={{uri: recommendedProducts[1].image}} />
                                                </View>
                                                <View style={styles.recommendedProductsIcon}>
                                                    <Image style={styles.recommendedProductsIconData} source={GlutenIcon} />
                                                </View>
                                                <View style={styles.recommendedProductsText}>
                                                    <Text style={styles.recommendedProductsName}>{recommendedProducts[1].classification+" "+ recommendedProducts[1].brandName}</Text>
                                                </View>
                                            </Pressable>)
                                        }
                                    </View>
                                </View>)
                            }
                            

                        </View>
                    </ScrollView>
                </View>
                )}
            <StatusBar style="auto" />
        </View>
    );
}

