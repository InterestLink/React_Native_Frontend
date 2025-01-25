import * as React from 'react';
import { View, Text } from 'react-native';
import StyleExample from '../styles/StyleExample';

export default function DefaultHome({navigation}) {
    return (
        <View style={StyleExample.container}>
            <Text
                onPress={() => navigation.navigation('Feed')}
                >In DefaultHome, click to go to Feed</Text>
            <StatusBar style="auto" />
        </View>
    )
}