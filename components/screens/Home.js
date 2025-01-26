import * as React from 'react';
import { View, Text } from 'react-native';
import StyleExample from '../styles/StyleExample';

export default function Home({navigation}) {
    return (
        <View style={StyleExample.container}>
            <Text>In Home</Text>
        </View>
    )
}