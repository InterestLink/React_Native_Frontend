import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  // Placeholder functions for clickable options
  const handleOptionPress = (option) => {
    console.log(`${option} pressed`);
    // Add navigation or functionality here later
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable List of Options */}
      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Account')}>
          <Text style={styles.optionText}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Privacy and Security')}>
          <Text style={styles.optionText}>Privacy and Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Notifications')}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Moderation')}>
          <Text style={styles.optionText}>Moderation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Content')}>
          <Text style={styles.optionText}>Content</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Appearance')}>
          <Text style={styles.optionText}>Appearance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Accessibility and Language')}>
          <Text style={styles.optionText}>Accessibility and Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Help')}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('About')}>
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={() => handleOptionPress('Sign Out')}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  signOutButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  signOutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Settings;