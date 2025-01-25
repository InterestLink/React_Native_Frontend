import * as React from 'react';
import { View, Text } from 'react-native';
import StyleExample from '../styles/StyleExample';

export default function Feed({navigation}) {
    return (
        <View style={StyleExample.container}>
            <Text
                onPress={() => navigation.navigation('DefaultHome')}
                >In Feed, click to go to DefaultHome</Text>
            <StatusBar style="auto" />
        </View>
    )
}