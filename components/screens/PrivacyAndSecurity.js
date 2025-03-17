import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const PrivacyAndSecurity = () => {
  const [showNSFW, setShowNSFW] = useState(false);
  const [personalizedFeed, setPersonalizedFeed] = useState(true);
  const [adPreferences, setAdPreferences] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Privacy and Security</Text>
        
        <Text style={styles.sectionHeader}>Information Collection</Text>
        <Text style={styles.sectionText}>
          We collect personal information such as name, email, and usage data to personalize your experience.
        </Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Show NSFW Content</Text>
          <Switch value={showNSFW} onValueChange={setShowNSFW} />
        </View>

        <Text style={styles.sectionHeader}>Feed Customization</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Personalized Feed</Text>
          <Switch value={personalizedFeed} onValueChange={setPersonalizedFeed} />
        </View>

        <Text style={styles.sectionHeader}>Advertising</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Ad Personalization</Text>
          <Switch value={adPreferences} onValueChange={setAdPreferences} />
        </View>

        <Text style={styles.sectionHeader}>Security Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Two-Factor Authentication</Text>
          <Switch value={twoFactorAuth} onValueChange={setTwoFactorAuth} />
        </View>

        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Email Notifications</Text>
          <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
  },
});

export default PrivacyAndSecurity;
