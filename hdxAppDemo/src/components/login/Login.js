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

ss
import Tab from '../Tab'
import Settings from '../../Tool/Settings'
import Toast from'../../../node_modules/antd-mobile/lib/toast/index'
import User from '../../Tool/User'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
//持久化
import Storage from 'react-native-storage';

export default class Login extends Component{
    static navigationOptions = {
        title: '欢迎',//标题
        headerStyle:{
            backgroundColor:'rgba(255,255,255,1.0)'
        },
        headerTitleStyle:{
            color:'rgba(48,192,255,1.0)'
        },
    };

    constructor(props){
        super(props);
        this.state = {
            zhanghao:"",
            yanzhenma:"",
            isYZMBtn:false,//是否可以点击验证码
            YZMBtnTime:0,//倒数时间
            animating: false,//是否显示菊花
            registrationId:''
        };
    }
    // 复杂的操作:定时器\网络请求
    componentDidMount(){
        this.timer = setInterval(
            () => {
                // 页面的切换
                if (this.state.YZMBtnTime != 0){
                    console.log(this.state.YZMBtnTime)
                    this.setState({YZMBtnColor: 'gray'});
                    this.setState({YZMBtnTime:this.state.YZMBtnTime-1})
                }else{
                    this.setState({YZMBtnColor: 'rgba(48,192,255,1.0)'});
                    this.setState({isYZMBtn:false})
                }
            },
            1000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    marginTop : 30,
                    alignItems : 'center',
                    justifyContent : 'center',

                }}>
                    <View style={styles.zongViewStyle}>
                        <TextInput style={styles.zhanghaoStyle}
                                   textalign="center"
                                   placeholder="请输入手机号"
                                   keyboardType="numeric"
                                   clearButtonMode="while-editing"
                                   underlineColorAndroid={'transparent'}
                                   onChangeText={this.onZhanghao.bind(this)}//获取输入
                        />
                        <View style={styles.yanzhenmaViewStyle}>
                            <TextInput style={styles.yanzhengmaStyle}
                                       textalign="center"
                                       placeholder="请输入验证码"
                                       keyboardType="numeric"
                                       clearButtonMode="while-editing"
                                       onChangeText={this.onYanzhenma.bind(this)}//获取输入
                            />
                            <TouchableOpacity style={styles.yanzhengmaBtnStyle} onPress={this.getIDCode.bind(this)} disabled={this.state.isYZMBtn}>
                                <Text style={{color:'white',fontSize: 14}}>
                                    {this.state.YZMBtnTime===0 ? '发送验证码':this.state.YZMBtnTime + 's后重发'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.dengluBtnStyle} onPress={this.getLogin.bind(this)}>
                            <Text style={{color:'white',fontSize: 14,marginLeft:15}}>
                                登 录
                            </Text>
                            <ActivityIndicator
                                animating={false}
                                style={[styles.centering, {height: 30}]}
                                size="small"
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    onChange(files, type, index) {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    //输入账号时
    onZhanghao(text){
        this.setState({zhanghao: text});
    }

    //输入验证码时
    onYanzhenma(text){
        this.setState({yanzhenma: text});
    }

    //获取验证码
    getIDCode(){
        //开启定时器倒数
        this.setState({YZMBtnTime:60,isYZMBtn:true})
        //判断手机号是否输入11位
        if (this.state.zhanghao.length == 11){
            //网络请求
            fetch(Settings.Url + 'Request Verification code through ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.state.zhanghao
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.isSucceed == 200){
                        //错误
                        Alert.alert(
                            '温馨提示',
                            responseJson.msg,
                            [
                                {text: '确定'}
                            ]
                        )
                    }else {
                        //接收到了数据
                        this.setState({dataYZM: responseJson.IDCode});
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        '温馨提示',
                        '网络连接失败',
                        [
                            {text: '确定'}
                        ]
                    )
                });
        }else {//提示错误
            Alert.alert(
                '温馨提示',
                '您输入的手机号有误',
                [
                    {text: '确定'}
                ]
            )
        }
    }

    //登录
    getLogin(){
        this.setState({animating:true});
        Toast.loading('登陆中',60);
        //发送登录网络请求
        fetch(Settings.Url + "connect/token", {
            method: 'POST',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log('12123123123123');
            console.log(responseJson);
                Toast.hide()
                User.Token = responseJson.id_token;
                this.props.navigation.navigate('SetUserData')
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
                this.setState({animating:false});
            });
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems : 'center'
    },
    daohangIOSStyle:{
        width:width,
        height:Platform.OS == 'ios' ? 20 : 0,
        backgroundColor:'rgba(0,136,212,1.0)',
    },
    daohangStyle:{
        alignItems: 'center',
        justifyContent:'center',
        width:width,
        height:44,
        backgroundColor:'rgba(48,192,255,1.0)',
    },
    zongViewStyle: {
        marginTop:20
    },
    zhanghaoStyle: {
        width:width,
        height: 40,
        backgroundColor:'white',
        paddingLeft:10,
        fontSize: 14,
    },
    yanzhenmaViewStyle: {
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 设置主轴的对齐方式
        justifyContent:'space-around',
        backgroundColor:'white',
    },
    yanzhengmaStyle: {
        width:width - 100,
        height: 40,
        backgroundColor:'white',
        marginTop:1,
        paddingLeft:10,
        fontSize: 14
    },
    yanzhengmaBtnStyle:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:1,
        width:100,
        height:40,
        backgroundColor:'rgba(48,192,255,1.0)',
    },
    dengluBtnStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 设置主轴的对齐方式
        justifyContent:'center',
        width:width - 40,
        marginTop:20,
        marginLeft:20,
        height:40,
        backgroundColor:'rgba(48,192,255,1.0)',
        // 设置圆角
        borderRadius:5,
    },
    biaoshiStyle:{
        marginTop:height - 300,
        alignItems: 'center',
        justifyContent:'center',
        width:width,
        height: 60,
    }
});