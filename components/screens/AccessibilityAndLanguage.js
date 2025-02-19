import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const AccessibilityLanguageSettings = () => {
  const [isVoiceOverEnabled, setIsVoiceOverEnabled] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('Medium');
  const [language, setLanguage] = useState('English');

  const textSizes = ['Small', 'Medium', 'Large'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accessibility & Language</Text>

      {/* VoiceOver / TalkBack Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable VoiceOver / TalkBack</Text>
        <Switch value={isVoiceOverEnabled} onValueChange={() => setIsVoiceOverEnabled((prev) => !prev)} />
      </View>

      {/* Text Size Selector */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Text Size</Text>
        <View style={styles.buttonGroup}>
          {textSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.optionButton, textSize === size && styles.selectedButton]}
              onPress={() => setTextSize(size)}
            >
              <Text style={[styles.optionText, textSize === size && styles.selectedText]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* High Contrast Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>High Contrast Mode</Text>
        <Switch value={isHighContrast} onValueChange={() => setIsHighContrast((prev) => !prev)} />
      </View>

      {/* Language Selection */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Language</Text>
        <View style={styles.buttonGroup}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.optionButton, language === lang && styles.selectedButton]}
              onPress={() => setLanguage(lang)}
            >
              <Text style={[styles.optionText, language === lang && styles.selectedText]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  optionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'tomato',
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AccessibilityLanguageSettings;
