import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#fff',
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    texto: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        width: "80%",
    },
  });

export default styles;