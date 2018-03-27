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
import Settings from '../../Tool/Settings'
import Toast from'../../../node_modules/antd-mobile/lib/toast/index'

export default class Consultation extends Component{
    static navigationOptions = {
        title: '咨询',//标题
        headerStyle:{
            backgroundColor:'rgba(255,255,255,1.0)'
        },
        headerTitleStyle:{
            color:'rgba(48,192,255,1.0)'
        },
    };

    // 加载完成 复杂的操作:定时器\网络请求
    componentDidMount(){
        Toast.loading('请稍候',60);
        //发送登录网络请求
        fetch(Settings.Url + '/api/chat/1/contacts', {
            method: 'GET',
            headers: {
                'Bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('12312313');
                console.log(responseJson);
                
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>咨询</Text>
                <Text>咨询</Text>
                <Text>咨询</Text>
                <Text>咨询</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});