/**
 * Created by Rolle on 2018/2/23.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Button,
    Image,
    FlatList
} from 'react-native';
//持久化
import Storage from 'react-native-storage';
//登录界面
import Login from '../login/Login';
//导入stack导航组件
import { StackNavigator } from 'react-navigation';
import Settings from '../../Tool/Settings';
import Toast from'../../../node_modules/antd-mobile/lib/toast/index';
import MLListViewCell from '../../kit/MLListViewCell/MLListViewCell';

export default class Remind extends Component{
    static navigationOptions = {
        title: '提醒',//标题
        headerStyle:{
            backgroundColor:'rgba(255,255,255,1.0)'
        },
        headerTitleStyle:{
            color:'rgba(48,192,255,1.0)'
        },
    };

    //state
    constructor(props){
        super(props);
        this.state = {
            data:null,
        };
    }
    
    componentDidMount(){
        Toast.loading('请稍候',60);
        //发送登录网络请求
        fetch(Settings.Url + '/api/members/1/appointments?req-date=2018-03-09T12:30:15', {
            method: 'GET',
            headers: {
                'Bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.hide();
                console.log(responseJson)
                this.setState({
                    data:responseJson.appointments
                })
                
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
            });
    }

    componentWillMount(){
        AsyncStorage.getItem("token",function (error,result) {
            // if (error != null){
            //     this.props.navigation.navigate('Login');
            // }else if (result == null){
            //     console.log('123123123');
            //     this.props.navigation.navigate('Login')
            // }else{
            //     console.log(result);
            // }

        })
    }

    render() {
        return (
            <View style={{
                flex : 1
            }}>
                {
                    this.state.data == null ? <View key = 'View'/> : 
                    <FlatList
                        style = {{
                            flex : 1
                        }}
                        onRefresh={this.refreshing.bind(this)}
                        refreshing={false}
                        key = 'FlatList'
                        data={this.state.data}
                        renderItem={this._renderItem}
                    />
            }
                
            </View>
        );
    }

    refreshing(){
        //发送登录网络请求
        fetch(Settings.Url + '/api/members/1/appointments?req-date=2018-03-09T12:30:15', {
            method: 'GET',
            headers: {
                'Bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.hide();
                console.log(responseJson)
                this.setState({
                    data:responseJson.appointments
                })
                
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
            });
    }

    _renderItem = ({item}) => (
        <MLListViewCell 
        key = {item.id}
        leftHeadText = {item.description}  
        leftFootText = {item.source} 
        rightHeadText = {item.date}
        rightFootText = {item.type} 
        isShowTip = {false}
        cellHeight = {60}/>
    );
}

const styles = StyleSheet.create({

});