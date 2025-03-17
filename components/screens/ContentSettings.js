import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const ContentSettings = () => {
  const [showNSFW, setShowNSFW] = useState(false);
  const [personalizedFeed, setPersonalizedFeed] = useState(true);
  const [showTrending, setShowTrending] = useState(true);
  const [adPreferences, setAdPreferences] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Content Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Show NSFW Content</Text>
          <Switch value={showNSFW} onValueChange={setShowNSFW} />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Personalized Feed</Text>
          <Switch value={personalizedFeed} onValueChange={setPersonalizedFeed} />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Show Trending Topics</Text>
          <Switch value={showTrending} onValueChange={setShowTrending} />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Ad Personalization</Text>
          <Switch value={adPreferences} onValueChange={setAdPreferences} />
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

export default ContentSettings;
