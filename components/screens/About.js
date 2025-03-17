import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const About = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://example.com'); // Replace with actual website link
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About InterestLink</Text>

      <Text style={styles.description}>
        InterestLink is a social media platform designed to foster meaningful connections through small, focused communities.
      </Text>

      <Text style={styles.subtitle}>Our Mission</Text>
      <Text style={styles.description}>
        We aim to create meaningful connections based on:
      </Text>

      <View style={styles.listContainer}>
        <Text style={styles.listItem}>✔ Specific hobbies</Text>
        <Text style={styles.listItem}>✔ Passions</Text>
        <Text style={styles.listItem}>✔ Professional goals</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLearnMore}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default About;
