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
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "80%",
        height: "5%",
        marginBottom: "10%",
        borderRadius: 30,
        borderColor: '#D33333',
        borderWidth: 1,
        paddingHorizontal: "5%",
    },
    filterInput: {
        width: "80%",
        height: "100%",
        borderRadius: 30,
        paddingHorizontal: "5%",
    },
    filterIcon:{
        width: 24,
        height: 24,
        alignSelf: 'center',
    },
    listProductsView: {
        marginBottom: "10%",
        alignItems: 'center',
    },
    listProducts: {
        width: "90%",
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