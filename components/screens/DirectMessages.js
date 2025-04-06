import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const conversations = [
  { id: '1', name: 'John Doe', message: 'Hey, how are you?' },
  { id: '2', name: 'Jane Smith', message: 'Let’s catch up soon!' },
  { id: '3', name: 'Sam Green', message: 'Did you finish the project?' },
];

export default function DirectMessages({ navigation }) {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => navigation.navigate('ChatScreen', { conversationId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Direct Messages</Text>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
});
