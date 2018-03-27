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

import Settings from '../../Tool/Settings'
import User from '../../Tool/User'

//时间操作
var moment = require('moment');
moment().format();
import Toast from'../../../node_modules/antd-mobile/lib/toast/index'
import List from '../../../node_modules/antd-mobile/lib/list/index'
import InputItem from '../../../node_modules/antd-mobile/lib/input-item/index'
import Picker from '../../../node_modules/antd-mobile/lib/picker/index'
import Pickers from 'react-native-picker';

export default class SetUserData extends Component{
    //state
    constructor(props){
        super(props);
        this.state = {
            date : null,
            gender : '',
            dateOfBirth :'',
            name : '',
            animating : false
        };
    }

    // 加载完成 复杂的操作:定时器\网络请求
    componentDidMount(){
        let date = [];
        for(let i=1900;i<2030;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k);
                    }
                }
                let _month = {};
                _month[j] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i] = month;
            date.push(_date);
        }
        this.setState({
            date : date
        })
    }

    // 退出时调用
    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    marginTop:20
                }}>
                    <List>
                        <InputItem
                            type={'money'}
                            placeholder="请输入姓名"
                            clear
                            onChange={this.onName.bind(this)}
                            onBlur={(v) => { console.log('onBlur', v); }}
                        >姓名</InputItem>
                            <List.Item arrow="horizontal"
                                       onClick={this.setGender.bind(this)}
                                       extra={this.state.gender === '' ? "请选择" : this.state.gender}
                            >性别</List.Item>
                        <List.Item arrow="horizontal"
                                   onClick={this.setDateOfBirth.bind(this)}
                                   extra={this.state.dateOfBirth === '' ? "请选择" : this.state.dateOfBirth}
                        >出生年月</List.Item>
                    </List>
                    <TouchableOpacity style={styles.dengluBtnStyle} onPress={this.getDetermine.bind(this)}>
                        <Text style={{color:'white',fontSize: 14,marginLeft:15}}>
                            确 定
                        </Text>
                        <ActivityIndicator
                            animating={this.state.animating}
                            style={[styles.centering, {height: 30}]}
                            size="small"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    //选择出生日期
    setDateOfBirth(){
        Pickers.init({
            pickerData: this.state.date,
            selectedValue: [moment().format('YYYY'),moment().format('MM'),moment().format('DD')],
            onPickerConfirm: pickedValue => {
                this.setState({
                    dateOfBirth : pickedValue[0] + '-' + pickedValue[1] + '-' + pickedValue[2]
                })
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Pickers.show();
    }

    //选择性别
    setGender(){
        Pickers.init({
            pickerData:['男','女'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    gender : pickedValue[0]
                })
            },
            onPickerCancel: pickedValue => {

            },
            onPickerSelect: pickedValue => {

            }
        });
        Pickers.show();
    }

    //输入姓名
    onName(text){
        this.setState({
            name : text
        })
    }

    //点击确定
    getDetermine(){
        if (this.state.name.length == 0){
            Alert.alert(
                '温馨提示',
                '您输入姓名',
                [
                    {text: '确定'}
                ]
            );
            return;
        }
        if (this.state.gender.length == 0){
            Alert.alert(
                '温馨提示',
                '您选择性别',
                [
                    {text: '确定'}
                ]
            );
            return;
        }
        if (this.state.dateOfBirth.length == 0){
            Alert.alert(
                '温馨提示',
                '您选择出生日期',
                [
                    {text: '确定'}
                ]
            );
            return;
        }



        this.props.navigation.navigate('Questionnaire')
        Toast.loading('请稍候',60);
        //网络请求
        fetch('https://ffeb8020-8134-4daf-8fda-04ad189426d2.mock.pstmn.io/api/members', {
            method: 'POST',
            headers: {
                'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": "Jane",
                "lastName": "Doe",
                "dob": "1985-04-01",
                "gender": "F",
                "height": "5'2''",
                "weight": "110 lbs"
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('1111112222')
                console.log(responseJson)
            })
            .catch((error) => {
                Toast.hide()
                Alert.alert(
                    '温馨提示',
                    '网络连接失败',
                    [
                        {text: '确定'}
                    ]
                )
            });
    }
}

const styles = StyleSheet.create({
    container:{

    },
    nameStyle: {
        width:width,
        height: 40,
        backgroundColor:'white',
        paddingLeft:10,
        fontSize: 14,
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
})