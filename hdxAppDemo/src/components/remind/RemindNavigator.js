import React from 'react';
import { StackNavigator } from 'react-navigation';

import Remind from './Remind'
import Login from '../login/Login'

const RemindNavigator = StackNavigator({
    Remind: {
        screen: Remind,
    },
    Login: {
        screen: Login,
    }
});

export default RemindNavigator;