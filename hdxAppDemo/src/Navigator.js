
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Tab from "./components/Tab";

const Navigator = StackNavigator(

    {
        Tab:{screen:Tab},
    },

    {
        navigationOptions:{
            headerBackTitle:null,
            headerTintColor:'#333333',
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        },

        mode:'card',
    });
