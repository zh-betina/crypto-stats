import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
import Config from 'react-native-config';

const API_URL = `https://api.nanopool.org/v1/eth/user/${Config.ETH_ADDRESS}`;

const Nanopool = () => {
    const [res, setRes] = useState('no res for now');

    React.useEffect(() => {
        fetch(API_URL)
        .then((res) => { return res.json() })
        .then((json) => {
            return setRes(json.data.balance)
        })
        .catch((error) => { throw error });
    }, []);

    return (
        <View>
            <Text>{res}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Nanopool;
