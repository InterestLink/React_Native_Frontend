import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const conversations = [
  { id: '1', name: 'John Doe', recentMessage: 'Hey, how are you?', icon: 'https://picsum.photos/500/500?random=1' },
  { id: '2', name: 'Jane Smith', recentMessage: 'Let’s catch up soon!', icon: 'https://picsum.photos/500/500?random=2' },
  { id: '3', name: 'Sam Green', recentMessage: 'Did you finish the project?', icon: 'https://picsum.photos/500/500?random=3' },
];

export default function DirectMessages({ navigation }) {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => navigation.navigate('Messages', { screen: 'ChatScreen', params: item.name})}
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: item.icon }} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.recentMessage}>{item.recentMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conversation: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentMessage: {
    fontSize: 14,
    color: '#555',
  },
});
