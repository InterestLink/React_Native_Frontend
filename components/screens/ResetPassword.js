import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <Text style={styles.info}>Instructions to reset your password will be sent to your email.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  info: { fontSize: 16, color: '#555', marginTop: 10 },
});

export default ResetPassword;
