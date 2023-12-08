import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import styles from './styles';

import PagerView from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlutenIcon from '../../assets/glutenIcon.png';
import UserIcon from '../../assets/user-icon.png';

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

    handleRecoverUserData = async () => {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
    }

    async function handleLogout() {

        await AsyncStorage.multiRemove(['userToken', 'userId', 'userName', 'userEmail', 'userStatus']);
        setUserName('');

        navigation.navigate('StartPage');
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
                <Text style={styles.title}>Produtos Populares</Text>
                <View style={styles.bigProduct}>
                    <PagerView style={styles.viewPager} initialPage={0} onPageSelected={e => {handlePageChange(e.nativeEvent.position)}}>    
                        <View key="1">
                            <Image style={styles.bigProductImage} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaxClWdHz5UVWy3OdAr3b9N1wwy_vsh83TGg&usqp=CAU'}} />
                        </View>
                        <View key="2">
                            <Image style={styles.bigProductImage} source={{uri: 'https://static.wixstatic.com/media/4a5d70_0f10c1b9a2f6454398c78ea7c34b370c~mv2.jpg/v1/fill/w_480,h_640,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4a5d70_0f10c1b9a2f6454398c78ea7c34b370c~mv2.jpg'}} />
                        </View>
                        <View key="3">
                            <Image style={styles.bigProductImage} source={{uri: 'https://http2.mlstatic.com/D_Q_NP_884791-MLU50883274657_072022-O.webp'}} />
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

            </View>

            <StatusBar style="auto" />
        </View>
    );
}

