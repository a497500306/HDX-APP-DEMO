import React from 'react';
import { StackNavigator } from 'react-navigation';

import Consultation from './Consultation'

const ConsultationNavigator = StackNavigator({
    Consultation: {
        screen: Consultation,
    }
});

export default ConsultationNavigator;