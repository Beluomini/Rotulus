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

    const [glutenDetailsText, setGlutenDetailsText] = useState('');
    const [lactoseDetailsText, setLactoseDetailsText] = useState('');
    const [eggDetailsText, setEggDetailsText] = useState('');
    const [peanutDetailsText, setPeanutDetailsText] = useState('');

    const [nutricionalfactsModal, setNutricionalfactsModal] = useState(false);
    const [listIgredientsModal, setListIgredientsModal] = useState(false);

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
    
    handleGetPageData = async (itemID) => {

        // espera um tempo para carregar a pagina setando o loading para true
        setLoading(true);

        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);

        const userId = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');

        const user = await api.getUserById(userId, userToken);

        const userAlergiesNames = user.statusCode !== 401 && user.statusCode !== 500
                                    ? user.ingredientAlergies.map(ingredient => ingredient.ingredient.name)
                                    : [];

        const item = await api.getFoodById(itemID);
        setItem(item);

        // seta os detalhes de texto de cada alergênico do produto
        item.ingredients.forEach(ingredient => {
            if(ingredient.ingredient.name === "Trigo"){
                setGlutenDetailsText(ingredient.ingredient.description);
            }
            if(ingredient.ingredient.name === "Leite"){
                setLactoseDetailsText(ingredient.ingredient.description);
            }
            if(ingredient.ingredient.name === "Ovo"){
                setEggDetailsText(ingredient.ingredient.description);
            }
            if(ingredient.ingredient.name === "Amendoim"){
                setPeanutDetailsText(ingredient.ingredient.description);
            }
        });

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
        const sameClassificationProducts = recommendedProducts.filter(product => product.classificationId === item.classificationId);
        const otherClassificationProducts = recommendedProducts.filter(product => product.classificationId !== item.classificationId);

        // ordena os produtos da lista sameClassificationProducts por ordem de menor correspondencia de ingredientes alergênicos com o usuário
        sameClassificationProducts.sort((a, b) => {
            const aIngredients = a.ingredients.map(ingredient => ingredient.ingredient.name);
            const bIngredients = b.ingredients.map(ingredient => ingredient.ingredient.name);
            const aIntersection = aIngredients.filter(ingredient => userAlergiesNames.includes(ingredient));
            const bIntersection = bIngredients.filter(ingredient => userAlergiesNames.includes(ingredient));
            return aIntersection.length - bIntersection.length;
        });
        // ordena os produtos da lista otherClassificationProducts por ordem de menor correspondencia de ingredientes alergênicos com o usuário
        otherClassificationProducts.sort((a, b) => {
            const aIngredients = a.ingredients.map(ingredient => ingredient.ingredient.name);
            const bIngredients = b.ingredients.map(ingredient => ingredient.ingredient.name);
            const aIntersection = aIngredients.filter(ingredient => userAlergiesNames.includes(ingredient));
            const bIntersection = bIngredients.filter(ingredient => userAlergiesNames.includes(ingredient));
            return aIntersection.length - bIntersection.length;
        });

        // junta as duas listas de produtos recomendados
        const newRecommendedProducts = [...sameClassificationProducts, ...otherClassificationProducts];

        setRecommendedProducts(newRecommendedProducts.slice(0, 2));

        if(user.statusCode !== 401 && user.statusCode !== 500){
            // add todas os ids das comidas da lista de comidar user.foods e adiciona na variavel histProducts
            const histProducts = user.foods ? 
                await Promise.all(user.foods.map(async (food) => {
                    const foodData = await api.getFoodById(food.foodId);
                    return foodData.id;
                }))
                : [];
            setHistProducts(histProducts);
            
            const userUpdate = {...user, foodsHist: [...histProducts, itemID]};

            const response = await api.editUserHistById(user.id, userUpdate, userToken);
        }

        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            const teste2 = handleGetPageData(route.params.itemID);
        });
        const teste2 = handleGetPageData(route.params.itemID);

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
                                (containGluten || containLactose || containEgg || containPeanut ?
                                    <Text style={styles.itemDetailsText}> Este produto possui ingredientes alergênicos </Text>
                                    :
                                    <Text style={styles.itemDetailsText}> Este produto não possui ingredientes alergênicos </Text>)
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
                                            <Text style={styles.itemAdicionalText}>Saiba o que o trigo pode causar ao organismo.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {glutenDetails &&
                                <View style={styles.itemShowDetails}>
                                    <Text style={styles.itemShowDetailsText}>{glutenDetailsText}</Text>
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
                                            <Text style={styles.itemAdicionalText}>Saiba o que a leite pode causar ao organismo.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {lactoseDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}>{lactoseDetailsText}</Text>
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
                                            <Text style={styles.itemAdicionalText}>Saiba o que ovos podem causar ao organismo.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {eggDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}>{eggDetailsText}</Text>
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
                                            <Text style={styles.itemAdicionalText}>Saiba o que amendoim pode causar ao organismo.</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {peanutDetails &&
                            <View style={styles.itemShowDetails}>
                                <Text style={styles.itemShowDetailsText}>{peanutDetailsText}</Text>
                            </View>
                            }

                            <Pressable style={styles.itemNutricionalFactsButton} onPress={() => {setNutricionalfactsModal(!nutricionalfactsModal)}} >
                                <Text style={styles.itemNutricionalFactsButtonText}>Ver tabela nutricional</Text>
                            </Pressable>

                            <Pressable style={styles.itemNutricionalFactsButton} onPress={() => {setListIgredientsModal(!listIgredientsModal)}} >
                                <Text style={styles.itemNutricionalFactsButtonText}>Ver lista de ingredientes</Text>
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

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={listIgredientsModal}
                                onRequestClose={() => { setListIgredientsModal(!listIgredientsModal) }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={styles.itemListIngredients}>
                                            <Text style={styles.itemListIngredientsTitle}>Ingredientes</Text>
                                            <Pressable style={styles.itemListIngredientsCloseButton} onPress={() => {setListIgredientsModal(!listIgredientsModal)}} >
                                                <Icon name="close" size={30} color="#79747E" />
                                            </Pressable>
                                        </View>
                                        <View style={styles.itemListIngredientsData}>
                                            <View style={styles.itemListIngredientsDataView}>
                                                <Text style={styles.itemListIngredientsDataText}>{item.listIngredients}</Text>
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
                                                    onPress={() => {handleGetPageData(recommendedProduct.id)}} key={index}>
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
                                                            {recommendedProduct.ingredients.some(ingredient => ingredient.ingredient.name === "Amendoim") &&
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
                )
            }
            <StatusBar style="auto" />
        </View>
    );
}

