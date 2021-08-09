import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Link } from "react-router-native";

const Home = () => {
    return (
        <View style={styles.homeViewContainer}>
            <Text style={styles.homeViewText}>CryptoStats</Text>
            <Image source={require('../assets/eth-img.png')} style={styles.homeImg} />
            <Link to="/nanopool" underlayColor="#f0f4f7" style={styles.homeLink}>
                <Text style={styles.linkTxt}>Nanopool</Text>
            </Link>
            <Link to="/sparkpool" underlayColor="#f0f4f7" style={styles.homeLink}>
                <Text style={styles.linkTxt}>Sparkpool</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    homeViewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#293B5F',
        height: '100%',
    },
    homeViewText: {
        fontSize: 35,
        fontWeight: '600',
        color: '#DBE6FD',
    },
    homeLink: {
        width: 250,
        height: 50,
        margin: 20
    },
    linkTxt: {
        backgroundColor: '#47597E',
        color: '#DBE6FD',
        textAlign: 'center',
        height: 80,
        textAlignVertical: 'center',
        borderRadius: 10,
        fontSize: 20,
        textTransform: 'uppercase',
    },
    homeImg: {
        margin: 40
    }
});

export default Home;
