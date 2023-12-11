import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlutenIcon from '../../assets/glutenIcon.png';
import LactoseIcon from '../../assets/milk-icon.png';
import EggIcon from '../../assets/eggIcon.png';
import FilterIcon from '../../assets/filter-icon.png';
import UserIcon from '../../assets/user-icon.png';
import SearchIcon from '../../assets/search-icon.png';

export default function SearchPage({ navigation, route}) {

    const products = [
        {key: 'Produto 1 com nome grande', image: 'https://static.paodeacucar.com/img/uploads/1/759/21264759.jpg'},
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

    async function handleRecoverUserData() {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
    }

    
    useEffect(() => {
        handleRecoverUserData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo(a){userName ? ', '+userName.split(' ')[0] : '!'}</Text>
                <Pressable onPress={handleLogout}>
                    <Image style={styles.headerIcon} source={UserIcon} />
                </Pressable>
            </View>
            <View style={styles.page}>

                <Text style={styles.title}>Buscar Produtos</Text>

                <View style={styles.filter}>
                    <Image style={styles.filterIcon} source={SearchIcon} />
                    <TextInput style={styles.filterInput} />
                    <Image style={styles.filterIcon} source={FilterIcon} />
                </View>

                <View style={styles.listProductsView}>
                    <FlatList
                        style={styles.listProducts}
                        contentContainerStyle={{alignItems: 'center'}}
                        ItemSeparatorComponent={() => <View style={{height: 10}} />}
                        data={products}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.product}>
                                    <View style={styles.productImageBackground}>
                                        <Image style={styles.listProductsImage} source={{uri: item.image}} />
                                    </View>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productName}>{item.key}</Text>
                                        <View style={styles.productInfoIcons}>
                                            <Image style={styles.productInfoIcon} source={GlutenIcon} />
                                            <Image style={styles.productInfoIcon} source={LactoseIcon} />
                                            <Image style={styles.productInfoIcon} source={EggIcon} />
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>


            </View>
            
            <StatusBar style="auto" />
        </View>
    );
}

