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

import Toast from '../../../node_modules/antd-mobile/lib/toast/index'
import Carousel from '../../../node_modules/antd-mobile/lib/carousel/index'
import Button from '../../../node_modules/antd-mobile/lib/button/index'

export default class Information extends Component{
    static navigationOptions = {
        title: '资讯',//标题
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
                <Text>资讯</Text>
                <Text>资讯</Text>
                <Text>资讯</Text>
                <Text>资讯</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});