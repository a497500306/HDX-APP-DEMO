/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import User from './src/Tool/User'
import Tab from './src/components/Tab'
import LoginNavigator from './src/components/login/LoginNavigator'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            token:null,
            getHome:true
        };
    }

    componentWillMount(){
        this.subscription = DeviceEventEmitter.addListener('getHome',()=>{
            console.log('收到通知');
            this.setState({
                getHome : true
            })
        })
        AsyncStorage.getItem("token",function (error,result) {
            if (result !== null){
                console.log(result);
                User.Token = result;
                this.setStart({
                    token:result
                })
            }

        })
    }

    omponentWillUnmount(){
        this.subscription.remove()
    }

    render() {
        return (
            this.state.getHome === false ? (this.state.token !== null ? <Tab/> : <LoginNavigator/>) : <Tab/>
        );
    }
}
