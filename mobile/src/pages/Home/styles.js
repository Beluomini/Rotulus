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
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#D33333',
        marginBottom: "5%",
        marginTop: "5%",
    },
    bigProduct: {
        width: "90%",
        height: "20%",
        marginBottom: "5%",
        alignItems: 'center',
    },
    bigProductImage: {
        width: "10%",
        height: "100%",
        alignSelf: 'center',
    },
    viewPager: {
        width: "100%",
        height: "80%",
        alignItems: 'center',
    },
    circles: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    circleFull: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: '#D33333',
        margin: 5,
    },
    circleEmpty: {
        width: 15,
        height: 15,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D33333',
        margin: 5,
    },
    listProductsView: {
        height: "53%",
        alignItems: 'center',
    },
    listProducts: {
        width: "100%",
        flexBasis: 0,
    },
    product: {  
        width: "30%",
        flexDirection: 'column',
        justifyContent: 'center',
    },
    productImageBackground: {
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    listProductsImage: {
        width: 80,
        height: 80,
        margin: 10,
        alignSelf: 'center',
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#79747E',
        textAlign: 'left',
        width: "80%",
    },
    productInfoIcon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    navigationBar: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: "10%",
        paddingHorizontal: "10%",
    },
  });

export default styles;