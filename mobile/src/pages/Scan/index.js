import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

import api from '../../services/Api';

import ScanImage from '../../assets/scan-icon.png';

export default function ScanPage({ navigation, route}) {

    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const food = await api.getFoodByBarcode(data);
        if (food.id) {
            navigation.navigate('ProductPage', {
                itemID: food.id,
            })
        }else{
            alert(`Produto com rótulo ${data} ainda não está cadastrado no sistema :(`);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {isFocused ?
                (<BarCodeScanner
                    barCodeTypes={[
                        BarCodeScanner.Constants.BarCodeType.upc_a
                    ]}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    type={BarCodeScanner.Constants.Type.back}
                    style={styles.camera}
                />): (
                    <Text style={styles.texto}>Ativando câmera</Text>
                )}
            
            {scanned && isFocused
                ?   <Button color={'#D33333'} title={'Clique para escanear'} onPress={() => setScanned(false)} /> 
                :   <View style={styles.line}>
                        <Image source={ScanImage} style={{width: 300, height: 300}} />
                    </View>
            }

            <StatusBar style="auto" />
        </View>
    );
}

