import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword'); // Ensure ResetPassword.js exists
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => console.log("Account Deleted"), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      {/* Reset Password */}
      <TouchableOpacity style={styles.option} onPress={handleResetPassword}>
        <Text style={styles.optionText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Change Username (Placeholder) */}
      <TouchableOpacity style={styles.option} onPress={() => Alert.alert("Change Username", "Feature coming soon!")}>
        <Text style={styles.optionText}>Change Username</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#007bff',
  },
  deleteButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
