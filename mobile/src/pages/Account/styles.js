import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    all: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#D33333',
        alignItems: 'center',
        paddingTop: "20%",
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: "10%",
    },
    alergies: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    arrowIconButton: {
        position: 'absolute',
        left: "7%",
        top: "1%",
    },
    arrowIcon: {
        width: 30,
        height: 30,
        transform: [{ rotate: '90deg' }],
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#fff',
        marginBottom: "15%",
    },
    userIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    userName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10%",
        marginBottom: "7%",
    },
    userNameText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#fff',
    },
    userNameInput: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    editIconButton: {
        marginLeft: 10,
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    okIcon: {
        width: 20,
        height: 20,
    },
    email: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#fff',
    },
    alergiesTitle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#000',
        marginTop: "5%",
    },
    alergiesBox: {
        width: '80%',
        height: '70%',
        marginTop: "5%",
    },
    alergiesInput: {
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    buttonBox: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#D33333',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#fff',
    },
  });

export default styles;