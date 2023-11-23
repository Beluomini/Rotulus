import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D33333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        backgroundColor: '#FFFFFF',
        marginTop: "60%",
        borderRadius: 25,
        height: "100%",
        width: "100%",
        alignItems: 'center',
    },
    title: {
        width: "85%",
        marginTop: "8%",
        alignItems: 'left',
    },
    titleText: {
        fontFamily: 'Roboto',
        fontSize: 30,
        color: '#D33333',
    },
    inputData: {
        width: "100%",
        alignItems: 'center',
        height: "38%",
    },
    input: {
        width: "85%",
        height: "17%",
        justifyContent: 'center',
        marginTop: "13%",
        alignItems: 'left',
        borderWidth: 1,
        borderRadius: 4,
    },
    inputText: {
        width: "85%",
        height: "100%",
        fontFamily: 'Roboto',
        fontSize: 16,
        marginLeft: "5%",
        marginTop: -10,
    },
    inputButton: {
        width: "15%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    inputDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "5%",
        marginTop: -12,
        width: "15%",
        backgroundColor: '#FFFFFF',
    },
    inputDetailText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#000000',
    },
    button: {
        width: "65%",
        marginBottom: "5%",
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#D33333',
        padding: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        textAlign: 'center',
        borderRadius: 40,
        letterSpacing: 1,
    },
    buttonGoogle: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 40,
    },
    buttonGoogleText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#D33333',
        textAlign: 'center',
        letterSpacing: 1,
    },
    googleImage: {
        width: 30,
        height: 30,
        marginRight: "5%",
    },
    inputForgot: {
        width: "85%",
        justifyContent: 'center',
        marginBottom: "13%",
        marginTop: "2%",
        alignItems: 'left',
    },
    inputError: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "2%",
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#D33333',
        borderColor: '#D33333',
    },
    inputErrorText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    
  });

export default styles;