import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const Notifications = () => {
  const [mentions, setMentions] = useState(true);
  const [messages, setMessages] = useState(true);
  const [replies, setReplies] = useState(true);
  const [follows, setFollows] = useState(false);
  const [trending, setTrending] = useState(false);
  const [updates, setUpdates] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Notification Settings</Text>
        
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Mentions</Text>
          <Switch value={mentions} onValueChange={setMentions} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Direct Messages</Text>
          <Switch value={messages} onValueChange={setMessages} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Replies to My Posts</Text>
          <Switch value={replies} onValueChange={setReplies} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>New Followers</Text>
          <Switch value={follows} onValueChange={setFollows} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Trending Topics</Text>
          <Switch value={trending} onValueChange={setTrending} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>App Updates & Announcements</Text>
          <Switch value={updates} onValueChange={setUpdates} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Notifications;