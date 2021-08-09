import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { NativeRouter, Route } from "react-router-native";
import Home from './views/Home';
import Nanopool from './views/Nanopool';

const App = () => {

  return (
    <NativeRouter>
      <View style={styles.appWrapper}>
        <Route exact path="/" component={Home} />
        <Route path="/nanopool" component={Nanopool} />
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  appWrapper: {
    backgroundColor: '#293B5F',
    height: '100%',
    width: '100%'
  },
});

export default App;
