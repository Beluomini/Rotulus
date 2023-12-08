import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';
import styles from './styles';

import ArrowIcon from '../../assets/down-arrow-white-icon.png';

import eating_healthy from '../../assets/eating_healthy.png';
import grocery_shopping from '../../assets/grocery_shopping.png';

export default function WelcomePage({ navigation, route}) {

    const [pageNumber, setPageNumber] = useState(0);
    const [circle1style, setCircle1Style] = useState(styles.circleFull);
    const [circle2style, setCircle2Style] = useState(styles.circleEmpty);

    handlePageChange = () => {
        if (pageNumber === 1) {
            setPageNumber(0);
            setCircle1Style(styles.circleEmpty);
            setCircle2Style(styles.circleFull);
        }else{
            setPageNumber(1);
            setCircle1Style(styles.circleFull);
            setCircle2Style(styles.circleEmpty);
        }
    }

  return (
        <View style={styles.container}>
            <PagerView style={styles.viewPager} initialPage={0} onPageSelected={handlePageChange}>

                <View  style={styles.page} key={1}>
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.navigate('StartPage')}>
                            <Image source={ArrowIcon} style={styles.headerText} />
                        </Pressable>
                    </View>
                    <View style={styles.image}>
                        <Image source={eating_healthy} />
                    </View>
                    <Text style={styles.title} >Bem-vindo ao Rótulus!</Text>
                    <Text style={styles.texto} >
                        Comprar alimentos mais saudáveis ficou mais rápido e fácil!
                    </Text>
                </View>

                <View  style={styles.page} key={2}>
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.navigate('StartPage')}>
                        <Image source={ArrowIcon} style={styles.headerText} />
                        </Pressable>
                    </View>
                    <View style={styles.image}>
                        <Image source={grocery_shopping} />
                    </View>
                    <Text style={styles.title} >Escaneie os alimentos</Text>
                    <Text style={styles.texto} >
                        Escaneie o código de barra dos produtos e veja suas informações nutricionais!
                    </Text>
                </View>
               

            </PagerView>

            <View style={styles.circles}>
                <View style={circle1style} />
                <View style={circle2style} />
            </View>
            
            <StatusBar style="auto" />
        </View>
  );
}

