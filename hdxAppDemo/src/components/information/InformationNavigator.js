import React from 'react';
import { StackNavigator } from 'react-navigation';

import Information from './Information'

const InformationNavigator = StackNavigator({
    Information: {
        screen: Information,
    }
});

export default InformationNavigator;