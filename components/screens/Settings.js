import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

const Settings = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Rest navigation stack and go to login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Sign Out Failed', error.message);
    }
  };

  const handleOptionPress = (option) => {
    console.log(`${option} pressed`);
    // Add navigation or functionality here later
    switch (option) {
      case 'Account':
        navigation.navigate('AccountSettings');
        break;
      case 'Privacy and Security':
        navigation.navigate('PrivacyAndSecurity');
        break;
      case 'Notifications':
        navigation.navigate('Notifications');
        break;
      case 'Moderation':
        navigation.navigate('Moderation');
        break;
      case 'Content':
        navigation.navigate('ContentSettings');
        break;
      case 'Accessibility':
        navigation.navigate('Accessibility');
        break;
      case 'Help':
        navigation.navigate('Help');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'Sign Out':
        Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', onPress: handleSignOut },
          ],
        );
        break;
      default:
        break;
    }
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

        <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Accessibility')}>
          <Text style={styles.optionText}>Accessibility</Text>
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
