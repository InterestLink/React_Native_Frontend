import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import StyleExample from './components/styles/StyleExample';

export default function App() {
  return (
    <View style={StyleExample.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

/*
  Would suggest moving this and making your own components for specific styles - Julian
  Default styles, specific page style, etc..
  Take a look at components/styles/StyleExample.js to see what I mean

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/
