import * as React from 'react';
import { View, Text } from 'react-native';
import StyleExample from '../styles/StyleExample';

export default function Profile({navigation}) {
    return (
        <View style={StyleExample.container}>
            <Text>In profile</Text>
        </View>
    )
}