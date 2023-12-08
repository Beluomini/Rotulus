import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlutenIcon from '../../assets/glutenIcon.png';

import FilterIcon from '../../assets/filter-icon.png';


import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

export default function WelcomePage({ navigation, route}) {

    const products = [
        {key: 'Produto 1', image: 'https://static.paodeacucar.com/img/uploads/1/759/21264759.jpg'},
        {key: 'Produto 2', image: 'https://static.paodeacucar.com/img/uploads/1/354/607354.png'},
        {key: 'Produto 3', image: 'https://images.tcdn.com.br/img/img_prod/462274/sacos_para_pao_de_forma_com_foto_com_100_unidades_1454_1_464859583aca0ff122d267c659579001.jpg'},
        {key: 'Produto 4', image: 'https://ibassets.com.br/ib.item.image.large/l-598f041152f64417b9974d93e03a0127.png'},
        {key: 'Produto 5', image: 'https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/2/3252850.jpg'},
        {key: 'Produto 6', image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/cenourao/media/uploads/produtos/foto/68865d71137cfile.png'},
        {key: 'Produto 7', image: 'https://ibassets.com.br/ib.item.image.big/b-18fac3100061457b8653556f1ae0065f.jpeg'},
        {key: 'Produto 8', image: 'https://madureira.acouguebomboi.com.br/wp-content/uploads/2022/02/129827.jpeg'},
        {key: 'Produto 9', image: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/206461/--Pao-de-Forma-PULLMAN-Artesano-Na-Chapa-Pacote-500g.jpg?v=638181138699900000'},
        {key: 'Produto 10', image: 'https://ibassets.com.br/ib.item.image.big/b-18fac3100061457b8653556f1ae0065f.jpeg'},
        {key: 'Produto 11', image: 'https://madureira.acouguebomboi.com.br/wp-content/uploads/2022/02/129827.jpeg'},
        {key: 'Produto 12', image: 'https://ibassets.com.br/ib.item.image.large/l-598f041152f64417b9974d93e03a0127.png'},
        {key: 'Produto 13', image: 'https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/2/3252850.jpg'},
        {key: 'Produto 14', image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/cenourao/media/uploads/produtos/foto/68865d71137cfile.png'},
        {key: 'Produto 15', image: 'https://ibassets.com.br/ib.item.image.big/b-18fac3100061457b8653556f1ae0065f.jpeg'},
        {key: 'Produto 16', image: 'https://madureira.acouguebomboi.com.br/wp-content/uploads/2022/02/129827.jpeg'},
        {key: 'Produto 17', image: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/206461/--Pao-de-Forma-PULLMAN-Artesano-Na-Chapa-Pacote-500g.jpg?v=638181138699900000'},
        {key: 'Produto 18', image: 'https://ibassets.com.br/ib.item.image.big/b-18fac3100061457b8653556f1ae0065f.jpeg'},
        {key: 'Produto 19', image: 'https://madureira.acouguebomboi.com.br/wp-content/uploads/2022/02/129827.jpeg'},
        {key: 'Produto 20', image: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/206461/--Pao-de-Forma-PULLMAN-Artesano-Na-Chapa-Pacote-500g.jpg?v=638181138699900000'},
        {key: 'Produto 21', image: 'https://mercantilnovaera.vtexassets.com/arquivos/ids/206461/--Pao-de-Forma-PULLMAN-Artesano-Na-Chapa-Pacote-500g.jpg?v=638181138699900000'},
    ];

    const [userName, setUserName] = useState('');

    async function handleLogout() {
        await AsyncStorage.multiRemove(['userToken', 'userId', 'userName', 'userEmail', 'userStatus']);
        setUserName('');
        navigation.navigate('StartPage');
    }

    function handlePageChange(e){
        console.log(e);
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo(a){userName ? ', '+userName.split(' ')[0] : '!'}</Text>
                <Pressable onPress={handleLogout}>
                    <FontAwesome5 name="user-circle" size={35} color="white" />
                </Pressable>
            </View>
            <View style={styles.page}>

                <Text style={styles.title}>Buscar Produtos</Text>

                <View style={styles.filter}>
                    <FontAwesome name="search" size={24} color="black" />
                    <TextInput style={styles.filterInput} />
                    <Image style={styles.filterIcon} source={FilterIcon} />
                </View>

                <FlatList
                    style={styles.listProducts}
                    columnWrapperStyle={{justifyContent: 'space-around'}}
                    contentContainerStyle={{alignItems: 'center'}}
                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                    data={products}
                    numColumns={3}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.product}>
                                <View style={styles.productImageBackground}>
                                    <Image style={styles.listProductsImage} source={{uri: item.image}} />
                                </View>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.key}</Text>
                                    <Image style={styles.productInfoIcon} source={GlutenIcon} />
                                </View>
                            </View>
                        );
                    }}
                />


            </View>

            <View style={styles.navigationBar}>
                <Pressable onPress={() => navigation.navigate('HomePage')}>
                    <AntDesign name="home" size={35} color="black" />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('HistoryPage')}>
                    <MaterialIcons name="history" size={35} color="black" />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('HomePage')}>
                    <MaterialCommunityIcons name="barcode-scan" size={35} color="black" />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('SearchPage')}>
                    <Ionicons name="ios-search-outline" size={35} color="#D33333" />
                </Pressable>
            </View>
            
        </View>
    );
}
