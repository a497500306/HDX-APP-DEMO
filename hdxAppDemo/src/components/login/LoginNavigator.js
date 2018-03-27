import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../login/Login'
import Tab from '../Tab'
import SetUserData from '../login/SetUserData'
import Questionnaire from '../login/Questionnaire'

const LoginNavigator = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions:({navigation}) => ({
            title: '欢迎',//标题
            headerStyle:{
                backgroundColor:'rgba(255,255,255,1.0)'
            },
            headerTitleStyle:{
                color:'rgba(48,192,255,1.0)'
            },
        }),
    },

    SetUserData: {
        screen: SetUserData,
        navigationOptions:({navigation}) => ({
            title: '个人信息',//标题
            headerStyle:{
                backgroundColor:'rgba(255,255,255,1.0)'
            },
            headerTitleStyle:{
                color:'rgba(48,192,255,1.0)'
            },
        }),
    },

    Questionnaire: {
        screen: Questionnaire,
        navigationOptions:({navigation}) => ({
            title: '问卷',//标题
            headerStyle:{
                backgroundColor:'rgba(255,255,255,1.0)'
            },
            headerTitleStyle:{
                color:'rgba(48,192,255,1.0)'
            },
        }),
    },
    Tab: {
        screen: Tab,
        navigationOptions:({navigation}) => ({
            header: null
        }),
    }
});

export default LoginNavigator;