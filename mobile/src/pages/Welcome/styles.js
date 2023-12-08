import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#D33333',
    },
    page: {
        flex: 1,
        backgroundColor: '#D33333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        width: "20%",
        marginRight: "3%",
    },
    headerText: {
        height: 30,
        width: 30,
        transform: [{ rotate: '270deg'}],
    },
    image:{
        width: "75%",
        marginBottom: "15%",
    },
    imageContent: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: '#fff',
        marginBottom: "20%",
    },
    texto: {
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        width: "80%",
    },
    circles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginBottom: "20%",
    },
    circleFull: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: '#fff',
        margin: 5,
    },
    circleEmpty: {
        width: 15,
        height: 15,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        margin: 5,
    },
  });

export default styles;