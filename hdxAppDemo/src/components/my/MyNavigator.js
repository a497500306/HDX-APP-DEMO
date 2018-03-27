import React from 'react';
import { StackNavigator } from 'react-navigation';

import My from './My'

const MyNavigator = StackNavigator({
    My: {
        screen: My,
    }
});

export default MyNavigator;