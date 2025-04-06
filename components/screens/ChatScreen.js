import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen({ route }) {
  const { conversationName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'received' },
    { id: '2', text: 'Hi there!', sender: 'sent' },
    { id: '3', text: 'How are you?', sender: 'received' },
    { id: '4', text: 'I\'m good, thanks! How about you?', sender: 'sent' },
    { id: '5', text: 'I\'m doing well, just a bit busy.', sender: 'received' },
    { id: '6', text: 'I understand, work can be hectic sometimes.', sender: 'sent' },
    { id: '7', text: 'Yeah, but I\'m managing. What\'s new with you?', sender: 'received' },
    { id: '8', text: 'Not much, just the usual. Been working on a new project.', sender: 'sent' },
    { id: '9', text: 'That sounds interesting! What is it about?', sender: 'received' },
    { id: '10', text: 'It\'s a mobile app for personal finance management.', sender: 'sent' },
    { id: '11', text: 'Oh, cool! That sounds like something a lot of people would need.', sender: 'received' },
    { id: '12', text: 'Yeah, exactly! It helps people track their expenses and set savings goals.', sender: 'sent' },
    { id: '13', text: 'I think that could really help a lot of people. When will it be available?', sender: 'received' },
    { id: '14', text: 'We\'re aiming for a beta release in a couple of months.', sender: 'sent' },
    { id: '15', text: 'I\'ll definitely check it out when it comes out!', sender: 'received' },
    { id: '16', text: 'Thanks! I appreciate the support.', sender: 'sent' },
    { id: '17', text: 'Of course! Always happy to support cool projects.', sender: 'received' },
    { id: '18', text: 'You\'re awesome. Thanks again!', sender: 'sent' },
    { id: '19', text: 'No problem! Keep me updated, I\'d love to hear more.', sender: 'received' },
    { id: '20', text: 'Will do! Take care.', sender: 'sent' },
    { id: '21', text: 'You too! Talk soon.', sender: 'received' },
  ]);

  const flatListRef = useRef();

  // Automatically scroll to the bottom whenever messages are updated
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
      setMessage('');
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatBox}
          //inverted // This property ensures that messages are displayed in reverse order (newest at the bottom)
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
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
    flexGrow: 1, // Ensures the chat area grows to fill available space
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    marginRight: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
  },
  sentMessage: {
    backgroundColor: '#D3D3D3',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#9B59B6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  sentText: {
    color: '#000',
  },
});
