import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D33333',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "90%",
        height: "5%",
        marginTop: "15%",
        marginBottom: "5%",
    },
    headerText: {
        fontFamily: 'Roboto',
        fontSize: 21,
        color: '#FFFFFF',
    },
    headerIcon: {
        width: 30,
        height: 30,
    },
    page: {
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    back: {
        width: "90%",
        height: "5%",
        marginTop: "5%",
        alignItems: 'flex-start',
    },
    backIcon: {
        width: 30,
        height: 30,
        transform: [{ rotate: '90deg'}],
    },
    itemPrincipals: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "90%",
        height: "20%",
        marginBottom: "5%",
        alignItems: 'center',
    },
    itemPrincipalImageBack: {
        width: "45%",
        height: "100%",
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    itemPrincipalImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: 10,
    },
    itemPrincipalText: {
        width: "45%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 20,
        color: '#79747E',
        marginBottom: "20%",
    },
    itemDetailsScroll: {
        width: "85%",
        marginBottom: "35%",
    },
    itemDetails: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    itemDetailsText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#79747E',
        textAlign: 'center',
    },
    itemAdicionalInfo: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: "5%",
    },
    itemAdicionalImage: {
        width: 70,
        height: 70,
    },
    itemAdicionalDetailsText: {
        width: "80%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    itemAdicionalTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#79747E',
        textAlign: 'center',
    },
    itemAdicionalIcon: {
        width: 25,
        height: 25,
        marginLeft: "5%",
    },
    itemAdicionalDetailsTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemAdicionalDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemAdicionalDetImageDown: {
        width: 30,
        height: 30,
        marginRight: "5%",
    },
    itemAdicionalDetImageUp: {
        width: 30,
        height: 30,
        marginRight: "5%",
        transform: [{ rotate: '180deg'}],
    },
    itemAdicionalText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#79747E',
        width: "85%",
    },
    itemShowDetails: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: "5%",
    },
    itemShowDetailsText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#79747E',
        width: "85%",
    },

    itemNutricionalFactsButton:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#D33333',
        borderRadius: 10,
        paddingHorizontal: "5%",
        paddingVertical: "3%",
        marginTop: "10%",
        marginBottom: "5%",
    },
    itemNutricionalFactsButtonText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#FFFFFF',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
        paddingBottom: "5%",
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
    itemNutricionalFactsCloseButton: {
        position: 'absolute',
        right: 20,
        top: 0,
    },
    itemNutricionalFacts: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: "5%",
    },
    itemNutricionalFactsTitle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#79747E',
        width: "85%",
        marginBottom: "5%",
        textAlign: 'center',
    },
    itemNutricionalFactsData: {
        width: "90%",
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#79747E',
        padding: "5%",
    },
    itemNutricionalFactsDataView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#79747E',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginBottom: "2%",
    },
    itemNutricionalFactsDataViewServing: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#79747E',
        borderBottomWidth: 1,
        marginBottom: "5%",
    },
    itemNutricionalFactsDataServing: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#D33333',
        fontWeight: 'bold',
    },
    itemNutricionalFactsDataText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#D33333',
    },
    recommendedView: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: "5%",
        flexDirection: 'column',
    },
    recommendedText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#79747E',
        width: "85%",
        marginBottom: "5%",
        textAlign: 'center',
    },
    recommendedProducts: {
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: "5%",
        flexDirection: 'row',
    },
    recommendedProductsData: {
        width: "48%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginBottom: "5%",
    },
    recommendedProductsImageBack: {
        width: 140,
        height: 140,
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    recommendedProductsImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: 10,
    },
    recommendedProductsText: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    recommendedProductsName: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#79747E',
        textAlign: 'left',
        width: "80%",
    },
    recommendedItemDetails: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: "5%",
    },
    recommendedProductsIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "80%",
        height: 30,
    },
    recommendedProductsIconData: {
        width: 20,
        height: 20,
    },
});

export default styles;