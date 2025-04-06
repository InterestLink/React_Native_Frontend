import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';

export default function ChatScreen({ route }) {
  const { conversationName } = route.params.conversationName;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'received' }, // Example of a received message
    { id: '2', text: 'Hi there!', sender: 'sent' }    // Example of a sent message
  ]);

  const flatListRef = useRef(); // Reference to FlatList

  // Scroll to the bottom when new message is added
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: message,
        sender: 'sent',
      };
      setMessages([...messages, newMessage]);
      setMessage(''); // Clear message after sending
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === 'sent' ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={[styles.messageText, item.sender === 'sent' && styles.sentText]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chat with {conversationName}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatBox}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSend} />
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
  chatBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 200,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
  },
  sentMessage: {
    backgroundColor: '#D3D3D3', // Light gray background for sent messages
    alignSelf: 'flex-end',       // Align to the right
  },
  receivedMessage: {
    backgroundColor: '#9B59B6', // Purple background for received messages
    alignSelf: 'flex-start',     // Align to the left
  },
  messageText: {
    fontSize: 16,
    color: '#fff', // Default white text color
  },
  sentText: {
    color: '#000', // Black text color for sent messages
  },
});
