import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';

export default function ChatScreen({ route }) {
  const { conversationId } = route.params;
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log('Sending message:', message);
    setMessage(''); // Clear message after sending
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chat with {conversationId}</Text>
      <View style={styles.chatBox}>
        {/* Placeholder for messages, you can dynamically render this */}
        <Text style={styles.message}>User: Hello!</Text>
      </View>
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
    marginBottom: 16,
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
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
});
