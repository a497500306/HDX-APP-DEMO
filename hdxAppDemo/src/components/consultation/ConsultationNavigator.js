import React from 'react';
import { StackNavigator } from 'react-navigation';

import Consultation from './Consultation'
import Pay from './Pay'

const ConsultationNavigator = StackNavigator({
    Consultation: {
        screen: Consultation,
    },
    Pay: {
        screen: Pay,
        navigationOptions:({navigation}) => ({
            title: '套餐选购',//标题
            headerStyle:{
                backgroundColor:'rgba(255,255,255,1.0)'
            },
            headerTitleStyle:{
                color:'rgba(48,192,255,1.0)'
            },
        }),
    },
});

export default ConsultationNavigator;