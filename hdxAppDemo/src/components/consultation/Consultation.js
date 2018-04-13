/**
 * Created by Rolle on 2018/2/23.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert
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
        //提示购买
        //错误
        Alert.alert(
            '前往购物车',
            '在线咨询不适用与免费版，需要购买这个付费功能吗？',
            [
                {text: '取消'},
                {text: '前往',onPress: this.getPay.bind(this)}
            ]
        )
        // Toast.loading('请稍候',60);
        // //发送登录网络请求
        // fetch(Settings.Url + '/api/chat/1/contacts', {
        //     method: 'GET',
        //     headers: {
        //         'Bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log('12312313');
        //         console.log(responseJson);
                
        //     })
        //     .catch((error) => {//错误
        //         Toast.hide()
        //         Toast.fail('请检查您的网络!!!', 1);
        //     });
    }

    //点击前往
    getPay(){
        this.props.navigation.navigate('Pay')
        Alert.alert(
            '前往购物车',
            '在线咨询不适用与免费版，需要购买这个付费功能吗？',
            [
                {text: '取消'},
                {text: '前往',onPress: this.getPay.bind(this)}
            ]
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View st>
                        <Text>前往购物车</Text>
                        <Text>在线咨询不适用与免费版，需要购买这个付费功能吗？</Text>
                    </View>
                    <View>
                    <Text>确定</Text>
                    <Text>取消</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems : 'center',
        flex:1
    }
});