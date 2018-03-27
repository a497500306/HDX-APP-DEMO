/**
 * Created by Rolle on 2018/3/7.
 */
import React, { Component } from 'react';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import {Image,Text,View} from 'react-native';

//引入控制器
import My from '../components/my/MyNavigator';
import Consultation from '../components/consultation/ConsultationNavigator';
import Information from '../components/information/InformationNavigator';
import Remind from '../components/remind/RemindNavigator';
import TabBarItem from "../TabBarItem";

const Tab = TabNavigator({
    Remind:{
        screen:Remind,
        navigationOptions:({navigation}) => ({
            tabBarLabel:'提醒',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    source={focused?require('../image/icon_remind_nor.png'):require('../image/icon_remind_pre.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            )
        }),
    },
    Consultation:{
        screen:Consultation,
        navigationOptions: {
            tabBarLabel: '咨询',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    source={focused?require('../image/icon_consultation_nor.png'):require('../image/icon_consultation_pre.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            )
        }
    },
    Information:{
        screen:Information,
        navigationOptions: {
            tabBarLabel: '资讯',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    source={focused?require('../image/icon_information_nor.png'):require('../image/icon_information_pre.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            )
        }
    },
    My:{
        screen:My,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon:({focused,tintColor})=>(
                <Image
                    source={focused?require('../image/icon_my_nor.png'):require('../image/icon_my_pre.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            )
        }
    },
}, {
    tabBarComponent:TabBarBottom,
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底部，因为 Android 默认显示在顶部
    swipeEnabled: false, // 禁止左右滑动
    lazy:true,
    showIcon: true,
    initialRouteName:'Remind',
    backBehavior:'none',
    tabBarOptions:{
        activeTintColor:'rgba(48,192,255,1.0)',
        activeBackgroundColor:'white',
        inactiveTintColor:'rgb(127,131,146)',
        inactiveBackgroundColor:'white',
        labelStyle:{
            fontSize:12
        }
    }
})

export default Tab;