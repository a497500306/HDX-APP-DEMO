import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class Login extends Component{
    //state
    constructor(props){
        super(props);
        this.state = {

        };
    }

    // 加载完成 复杂的操作:定时器\网络请求
    componentDidMount(){

    }

    // 退出时调用
    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems : 'center'
    },
})