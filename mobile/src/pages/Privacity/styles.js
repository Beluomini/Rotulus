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
        height: "16%",
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: "80%",
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#000',
    },
    modalText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        textAlign: 'center',
    },
    modalButtons: {
        width: "80%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "10%",
    },
    buttonClose: {
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "50%",
    },
    buttonOk: {
        backgroundColor: '#D33333',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyleBlack: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#000',
    },
    textStyleRed: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#FAFAFA',
    },
  });

export default styles;