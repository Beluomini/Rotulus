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
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    listProductsView: {
        height: "65%",
        width: "85%",
        alignItems: 'center',
    },
    listProducts: {
        width: "100%",
        flexBasis: 0,
    },
    product: {  
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "5%",
    },
    productImageBackground: {
        width: "30%",
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    listProductsImage: {
        width: 110,
        height: 110,
        alignSelf: 'center',
    },
    productInfo: {
        width: "60%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "5%",
    },
    productName: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#79747E',
        textAlign: 'left',
    },
    productInfoIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "5%",
    },
    productInfoIcon: {
        width: 25,
        height: 25,
        alignSelf: 'center',
        marginHorizontal: "2%",
    },
  });

export default styles;