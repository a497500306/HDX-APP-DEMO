/**
 * Created by Rolle on 2018/2/23.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class My extends Component{
    static navigationOptions = {
        title: '我',//标题
        headerStyle:{
            backgroundColor:'rgba(255,255,255,1.0)'
        },
        headerTitleStyle:{
            color:'rgba(48,192,255,1.0)'
        },
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>我的</Text>
                <Text>我的</Text>
                <Text>我的</Text>
                <Text>我的</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});