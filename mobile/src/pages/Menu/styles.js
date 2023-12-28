import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        paddingTop: "15%",
    },
    header: {
        width: "100%",
        height: "15%",
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: "5%",
    },
    arrowIconButton: {
        position: 'absolute',
        top: "10%",
        left: "5%",
    },
    arrowIcon: {
        width: 30,
        height: 30,
        transform: [{ rotate: '90deg'}],
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#000',
    },
    email: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#000',
    },
    loggedOptions: {
        width: "100%",
        alignItems: 'center',
        flexDirection: 'column',
    },
    optionAccount: {
        width: "90%",
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "5%",
    },
    pressableOption: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 30,
        height: 30,
        marginHorizontal: "5%",
    },
    optionText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#000',
    },
    arrowOptionIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: "5%",
        transform: [{ rotate: '270deg'}],
    },
  });

export default styles;