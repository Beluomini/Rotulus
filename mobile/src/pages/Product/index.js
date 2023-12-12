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

    const [userName, setUserName] = useState('');
    const [item, setItem] = useState({});

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

    handleGetItemData = async () => {
        const itemID = await route.params.itemID;

        const item = await api.getFoodById(itemID);
        setItem(item);
        // console.log(item);
    }
    
    handleRecoverUserData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
    }

    useEffect(() => {
        handleRecoverUserData();
        handleGetItemData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo(a){userName ? ', '+userName.split(' ')[0] : '!'}</Text>
                <Pressable onPress={() => {navigation.navigate('MenuPage')}}>
                    <Image style={styles.headerIcon} source={UserIcon} />
                </Pressable>
            </View>
            <View style={styles.page}>
                <View style={styles.back} >
                    <Pressable onPress={() => {navigation.goBack()}}>
                        <Image source={ArrowIcon} style={styles.backIcon} />
                    </Pressable>
                </View>
                <View style={styles.itemPrincipals}>
                    <Image style={styles.itemPrincipalImage} source={{uri: 'https://static.paodeacucar.com/img/uploads/1/759/21264759.jpg'}} />
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


                        <View style={styles.recommendedView}>
                            <Text style={styles.recommendedText}> Recomendados para você </Text>
                            <View style={styles.recommendedProducts}>
                                <View style={styles.recommendedProductsData}>
                                    <Image style={styles.recommendedProductsImage} source={{uri: 'https://static.paodeacucar.com/img/uploads/1/759/21264759.jpg'}} />
                                    <View style={styles.recommendedProductsText}>
                                        <Text style={styles.recommendedProductsName}>Arroz Integral</Text>
                                        <Image style={styles.recommendedProductsIcon} source={GlutenIcon} />
                                    </View>
                                </View>
                                <View style={styles.recommendedProductsData}>
                                    <Image style={styles.recommendedProductsImage} source={{uri: 'https://static.paodeacucar.com/img/uploads/1/759/21264759.jpg'}} />
                                    <View style={styles.recommendedProductsText}>
                                        <Text style={styles.recommendedProductsName}>Arroz Integral</Text>
                                        <Image style={styles.recommendedProductsIcon} source={GlutenIcon} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        

                    </View>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

