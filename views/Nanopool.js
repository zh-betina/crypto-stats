import React, { useState } from 'react';
import { Link } from 'react-router-native';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Modal,
    Image,
    TouchableHighlight
} from 'react-native';
import { ETH_ADDRESS } from '@env';

const API_URL = `https://api.nanopool.org/v1/eth/user/${ETH_ADDRESS}`;
const API_LAST_HASHRATE = `https://api.nanopool.org/v1/eth/reportedhashrate/${ETH_ADDRESS}`;

const Nanopool = () => {
    const [res, setRes] = useState({
        balance: '--',
        hashrate: '--',
        h6: '--',
        h12: '--'
    });
    const [latestHashRate, setLatestHashRate] = useState('--');
    const [isDataFetched, setIsDataFetched] = useState(!false);
    const [modalVisible, setModalVisible] = useState(false);

    const DATA = [
        {
            title: 'Balance',
            data: 'balance',
            unit: 'ETH'
        },
        {
            title: 'Average hashrate',
            data: 'hashrate',
            unit: 'Mh/s'
        },
        {
            title: '6h average hashrate',
            data: 'h6',
            unit: 'Mh/s'
        },
        {
            title: '12h average hashrate',
            data: 'h12',
            unit: 'Mh/s'
        }
    ];

    React.useEffect(() => {
        fetch(API_LAST_HASHRATE)
            .then((res) => { return res.json() })
            .then((json) => {
                if (json.status) {
                    return setLatestHashRate(`${json.data} Mh/s`);
                } else {
                    return setLatestHashRate('Error occured')
                }
            })
            .catch((error) => { throw error });
    }, []);

    React.useEffect(() => {
        fetch(API_URL)
            .then((res) => { return res.json() })
            .then((json) => {
                if (json.status) {
                    setIsDataFetched(!true);
                    return setRes({
                        balance: json.data.balance,
                        hashrate: json.data.hashrate,
                        h6: json.data.avgHashrate.h6,
                        h12: json.data.avgHashrate.h12
                    })
                } else {
                    return setModalVisible(true);
                }
            })
            .catch((error) => { throw error });
    }, []);

    return (
        <>
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <TouchableHighlight onPress={() => setModalVisible(false)}>
                        <Image style={styles.closeIcon} source={require('../assets/close-icon.png')} />
                    </TouchableHighlight>
                    <Text style={styles.modalTxt}>Ooops! Something went wrong! Maybe your Internet connection isn't working?</Text>
                </View>
            </Modal>
            <View style={styles.wrapper}>
                <Link to="/">
                    <Image source={require('../assets/home-icon.png')} />
                </Link>
                <Text style={styles.h1}>Nanopool Stats</Text>
                <Text style={styles.sub}>Last reported hashrate: {latestHashRate}</Text>
                {DATA.map((item, idx) => {
                    return (
                        <View key={idx} style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>{item.title}</Text>
                            <ActivityIndicator animating={isDataFetched} color="#E8F0F2" size="large" />
                            <Text style={styles.valueTxt}>{res[item.data]} {item.unit}</Text>
                        </View>
                    )
                })}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    h1: {
        fontSize: 25,
        color: '#39A2DB',
        fontWeight: '600'
    },
    sub: {
        fontSize: 20,
        color: '#39A2DB',
    },
    modal: {
        backgroundColor: '#EEEEEE',
        height: 150,
        width: 350,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 50
    },
    modalTxt: {
        textAlign: 'center',
        fontSize: 19,
        alignSelf: 'center',
        padding: 10
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
    separator: {
        width: 200,
        height: 2
    },
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%'
    },
    sectionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#39A2DB',
        borderRadius: 15,
        height: 100,
        width: 220
    },
    sectionHeader: {
        color: '#E8F0F2',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    valueTxt: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#E8F0F2',
        width: 230,
        height: 30,
        borderRadius: 5,
        fontSize: 20
    }
});

export default Nanopool;
