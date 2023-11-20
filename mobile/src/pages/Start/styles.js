import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: "75%",
        marginBottom: "15%",
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#000000',
        marginBottom: "15%",
    },
    button: {
        width: "80%",
        marginBottom: "10%",
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#D33333',
        padding: 10,
        paddingHorizontal: 40,
        textAlign: 'center',
        borderRadius: 40,
        letterSpacing: 1,
    },
    link: {
        width: "80%",
    },
    linkText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D33333',
        textAlign: 'center',
        letterSpacing: 1,
    },
    linkJump: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: "7%",
    },
  });

export default styles;