import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';

const Help = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to Settings > Account > Reset Password." },
    { question: "How do I report a problem?", answer: "You can report issues in Settings > Moderation." },
    { question: "How do I change my language settings?", answer: "Go to Settings > Accessibility." },
  ];

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Email us at interestlink@gmail.com");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      {/* FAQs Section */}
      <Text style={styles.subtitle}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}

      {/* Contact Support */}
      <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>

      {/* Community Guidelines Link */}
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => Linking.openURL('https://example.com/guidelines')}>
        <Text style={styles.linkText}>View Community Guidelines</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Help;
