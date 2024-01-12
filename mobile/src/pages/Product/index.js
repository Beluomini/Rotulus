import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ScrollView, Modal } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/Api';

import UserIcon from '../../assets/user-icon.png';
import ArrowIcon from '../../assets/down-arrow-red-icon.png';
import WarningIcon from '../../assets/warning-icon.png';
import GlutenIcon from '../../assets/glutenIcon.png';
import MilkIcon from '../../assets/milk-icon.png';
import EggIcon from '../../assets/eggIcon.png';
import PeanutIcon from '../../assets/peanutIcon.png';

export default function ProductPage({ navigation, route}) {

    const [isLoading, setLoading] = useState(true);

    const [userName, setUserName] = useState('');
    const [userAlergies, setUserAlergies] = useState([]);
    const [userAlergiesNames, setUserAlergiesNames] = useState([]);

    const [item, setItem] = useState({});
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [histProducts, setHistProducts] = useState([]);

    const [arrowGlutenStyle, setArrowGlutenStyle] = useState(styles.itemAdicionalDetImageDown);
    const [arrowLactoseStyle, setArrowLactoseStyle] = useState(styles.itemAdicionalDetImageDown);
    const [arrowEggStyle, setArrowEggStyle] = useState(styles.itemAdicionalDetImageDown);
    const [arrowPeanutStyle, setArrowPeanutStyle] = useState(styles.itemAdicionalDetImageDown);

    const [containGluten, setContainGluten] = useState(false);
    const [containLactose, setContainLactose] = useState(false);
    const [containEgg, setContainEgg] = useState(false);
    const [containPeanut, setContainPeanut] = useState(false);

    const [glutenDetails, setGlutenDetails] = useState(false);
    const [lactoseDetails, setLactoseDetails] = useState(false);
    const [eggDetails, setEggDetails] = useState(false);
    const [peanutDetails, setPeanutDetails] = useState(false);

    const [nutricionalfactsModal, setNutricionalfactsModal] = useState(false);

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
    function handlepeanutDetails() {
        setArrowPeanutStyle(arrowPeanutStyle === styles.itemAdicionalDetImageDown ? styles.itemAdicionalDetImageUp : styles.itemAdicionalDetImageDown);
        setPeanutDetails(!peanutDetails);
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

        const userId = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');

        const user = await api.getUserById(userId, userToken);
        if(user.statusCode !== 401){
            const userAlergies = user.ingredientAlergies.map(ingredient => ingredient.ingredient);
            setUserAlergies(userAlergies);
            setUserAlergiesNames(userAlergies.map(ingredient => ingredient.name));
        }

        const item = await api.getFoodById(itemID);
        setItem(item);

        const ingredientsName = item.ingredients.map(ingredient => ingredient.ingredient.name);
        if(ingredientsName.includes("Trigo") && userAlergiesNames.includes("Trigo")){
            setContainGluten(true);
        }
        if(ingredientsName.includes("Leite") && userAlergiesNames.includes("Leite")){
            setContainLactose(true);
        }
        if(ingredientsName.includes("Ovo") && userAlergiesNames.includes("Ovo")){
            setContainEgg(true);
        }
        if(ingredientsName.includes("Amendoim") && userAlergiesNames.includes("Amendoim")){
            setContainPeanut(true);
        }

        const recommendedProducts = await api.getAllFoods();
        // remove o produto atual da lista de produtos recomendados
        recommendedProducts.splice(recommendedProducts.findIndex(product => product.id === item.id), 1);
        // coloca em primeiro os produtos que são da mesma classificação
        recommendedProducts.sort((a, b) => {
            if(a.classification === item.classification){
                return -1;
            }
            if(b.classification === item.classification){
                return 1;
            }
            return 0;
        });
        // coloca em primeiro os produtos que não possuem alergênicos que o usuário possui
        recommendedProducts.sort((a, b) => {
            if(a.ingredients.some(ingredient => userAlergiesNames.includes(ingredient.ingredient.name))){
                return 1;
            }
            if(b.ingredients.some(ingredient => userAlergiesNames.includes(ingredient.ingredient.name))){
                return -1;
            }
            return 0;
        });
        // seleciona os 2 primeiros produtos da lista
        setRecommendedProducts(recommendedProducts.slice(0, 2));

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

            const response = await api.editUserHistById(user.id, userUpdate, userToken);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetHistList(route.params.itemID);
            handleGetPageData(route.params.itemID);
        });
        handleGetHistList(route.params.itemID);
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

                            {!userName ?
                                <Text style={styles.itemDetailsText}> Faça login para ver alegênicos para você </Text>
                                :
                                containGluten || containLactose || containEgg || containPeanut ?
                                    <Text style={styles.itemDetailsText}> Este produto possui ingredientes alergênicos </Text>
                                    :
                                    <Text style={styles.itemDetailsText}> Este produto não possui ingredientes alergênicos </Text>
                            }
                            {containGluten &&
                                <View style={styles.itemAdicionalInfo}>
                                    <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                    <View style={styles.itemAdicionalDetailsText}>
                                        <View style={styles.itemAdicionalDetailsTitle}>
                                            <Text style={styles.itemAdicionalTitle}> Contém glútem. </Text>
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
                            }
                            {glutenDetails &&
                                <View style={styles.itemShowDetails}>
                                    <Text style={styles.itemShowDetailsText}></Text>
                                </View>
                            }

                            {containLactose &&
                                <View style={styles.itemAdicionalInfo}>
                                    <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                    <View style={styles.itemAdicionalDetailsText}>
                                        <View style={styles.itemAdicionalDetailsTitle}>
                                            <Text style={styles.itemAdicionalTitle}> Pode conter leite. </Text>
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
                            }
                            {lactoseDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. A lactose é um carboidrato presente no leite e seus derivados. </Text>
                            </View>
                            }

                            {containEgg &&
                                <View style={styles.itemAdicionalInfo}>
                                    <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                    <View style={styles.itemAdicionalDetailsText}>
                                        <View style={styles.itemAdicionalDetailsTitle}>
                                            <Text style={styles.itemAdicionalTitle}> Pode conter ovos. </Text>
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
                            }
                            {eggDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. Os ovos são um alimento rico em proteínas, vitaminas e minerais. </Text>
                            </View>
                            }

                            {containPeanut &&
                                <View style={styles.itemAdicionalInfo}>
                                    <Image style={styles.itemAdicionalImage} source={WarningIcon} />
                                    <View style={styles.itemAdicionalDetailsText}>
                                        <View style={styles.itemAdicionalDetailsTitle}>
                                            <Text style={styles.itemAdicionalTitle}> Pode conter amendoim. </Text>
                                            <Image style={styles.itemAdicionalIcon} source={PeanutIcon} />
                                        </View>
                                        <View style={styles.itemAdicionalDetails}>
                                            <Pressable onPress={handlepeanutDetails}>
                                                <Image style={arrowPeanutStyle} source={ArrowIcon} />
                                            </Pressable>
                                            <Text style={styles.itemAdicionalText}>Saiba o que nozes em excesso pode causar ao organismo.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {peanutDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}> As nozes são um alimento rico em proteínas, vitaminas e minerais. As nozes são um alimento rico em proteínas, vitaminas e minerais. As nozes são um alimento rico em proteínas, vitaminas e minerais. As nozes são um alimento rico em proteínas, vitaminas e minerais. As nozes são um alimento rico em proteínas, vitaminas e minerais. As nozes são um alimento rico em proteínas, vitaminas e minerais. </Text>
                            </View>
                            }

                            <Pressable style={styles.itemNutricionalFactsButton} onPress={() => {setNutricionalfactsModal(!nutricionalfactsModal)}} >
                                <Text style={styles.itemNutricionalFactsButtonText}>Ver tabela nutricional</Text>
                            </Pressable>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={nutricionalfactsModal}
                                onRequestClose={() => { setNutricionalfactsModal(!nutricionalfactsModal) }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={styles.itemNutricionalFacts}>
                                            <Text style={styles.itemNutricionalFactsTitle}>Informações nutricionais</Text>
                                            <Pressable style={styles.itemNutricionalFactsCloseButton} onPress={() => {setNutricionalfactsModal(!nutricionalfactsModal)}} >
                                                <Icon name="close" size={30} color="#79747E" />
                                            </Pressable>
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
                                                    <Text style={styles.itemNutricionalFactsDataText}> Açúcares totais </Text>
                                                    <Text style={styles.itemNutricionalFactsDataText}> {item.totalSugar} g </Text>
                                                </View>
                                                <View style={styles.itemNutricionalFactsDataView}>
                                                    <Text style={styles.itemNutricionalFactsDataText}> Açúcares adicionados </Text>
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
                                    </View>
                                </View>
                            </Modal>

                            {recommendedProducts[0] && 
                                (<View style={styles.recommendedView}>
                                    <Text style={styles.recommendedText}> Recomendados para você </Text>
                                    <View style={styles.recommendedProducts}>
                                        {recommendedProducts.map((recommendedProduct, index) => {
                                            if(recommendedProduct.image){
                                                return (
                                                    <Pressable 
                                                    style={styles.recommendedProductsData}
                                                    onPress={() => {handleSelectRecommendedProduct(recommendedProduct.id)}} key={index}>
                                                        <View style={styles.recommendedProductsImageBack}>
                                                            <Image style={styles.recommendedProductsImage} source={{uri: recommendedProduct.image}} />
                                                        </View>
                                                        <View style={styles.recommendedProductsIcon}>
                                                            {recommendedProduct.ingredients.some(ingredient => ingredient.ingredient.name === "Trigo") &&
                                                                <Image style={styles.recommendedProductsIconData} source={GlutenIcon} />
                                                            }
                                                            {recommendedProduct.ingredients.some(ingredient => ingredient.ingredient.name === "Leite") &&
                                                                <Image style={styles.recommendedProductsIconData} source={MilkIcon} />
                                                            }
                                                            {recommendedProduct.ingredients.some(ingredient => ingredient.ingredient.name === "Ovo") &&
                                                                <Image style={styles.recommendedProductsIconData} source={EggIcon} />
                                                            }
                                                            {recommendedProduct.ingredients.some(ingredient => ingredient.ingredient.name === "Nozes") &&
                                                                <Image style={styles.recommendedProductsIconData} source={PeanutIcon} />
                                                            }
                                                        </View>
                                                        <View style={styles.recommendedProductsText}>
                                                            <Text style={styles.recommendedProductsName}>{recommendedProduct.description+" "+ recommendedProduct.brandName}</Text>
                                                        </View>
                                                    </Pressable>
                                                )
                                            }
                                        })}
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

