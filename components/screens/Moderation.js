import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Moderation = () => {
  const navigation = useNavigation();

  const handleReportIssue = () => {
    Alert.alert("Report Issue", "Email us at report@example.com");
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Moderation & Safety</Text>

      {/* Report Content */}
      <TouchableOpacity style={styles.button} onPress={handleReportIssue}>
        <Text style={styles.buttonText}>Report a Problem</Text>
      </TouchableOpacity>

      {/* Manage Blocked Users */}
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Blocked Users", "View and manage blocked users in your account settings.")}>
        <Text style={styles.buttonText}>Manage Blocked Users</Text>
      </TouchableOpacity>

      {/* Community Guidelines Link */}
      <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://example.com/guidelines')}>
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
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
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

export default Moderation;
