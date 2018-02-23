/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

//引入第三方tabbar
import TabNavigator from 'react-native-tab-navigator';

//引入控制器
import My from './src/components/my/My';
import Consultation from './src/components/consultation/Consultation';
import Information from './src/components/information/Information';
import Remind from './src/components/remind/Remind';

import { Navigator } from 'react-native-deprecated-custom-components'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
      return (
          <TabNavigator>
              {/*创建提醒*/}
              {this.renderTabBarItem('提醒',require('./src/image/icon_remind_nor.png'),require('./src/image/icon_remind_pre.png'),'Remind','提醒', Remind)}
              {/*创建咨询*/}
              {this.renderTabBarItem('咨询',require('./src/image/icon_consultation_nor.png'),require('./src/image/icon_consultation_pre.png'),'Consultation','咨询', Consultation)}
              {/*创建资讯*/}
              {this.renderTabBarItem('资讯',require('./src/image/icon_information_nor.png'),require('./src/image/icon_information_pre.png'),'Information','资讯', Information)}
              {/*创建我的*/}
              {this.renderTabBarItem('我的',require('./src/image/icon_my_nor.png'),require('./src/image/icon_my_pre.png'),'My','我的', My)}
          </TabNavigator>
      );
    }

    // 初始化函数(变量是可以改变的,充当状态机的角色)
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'Remind' // 默认是第一个
        };
    }

    // 每一个TabBarItem
    renderTabBarItem(title, iconName, selectedIconName, selectedTab, componentName, component, badgeText){
        return(
            <TabNavigator.Item
                title={title}  // 传递变量,一定要加{}
                renderIcon={() => <Image source={ iconName} style={styles.iconStyle}/>} // 图标
                renderSelectedIcon={() =><Image source={selectedIconName} style={styles.iconStyle}/>}   // 选中的图标
                onPress={()=>{this.setState({selectedTab:selectedTab})}}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText = {badgeText}
            >
              <Navigator
                initialRoute={{name:componentName,component:component}}
                configureScene={()=>{
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route,navigator)=>{
                    let Component = route.component;
                    return <Component {...route.passProps} navigator={navigator}/>;
                }}
            />
            </TabNavigator.Item>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle:{
        width: Platform.OS === 'ios' ? 26 : 25,
        height:Platform.OS === 'ios' ? 25 : 25
    },
    selectedTitleStyle:{
        color:'rgba(48,192,255,1.0)'
    }
});
