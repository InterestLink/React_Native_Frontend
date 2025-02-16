// ProfileList.js
import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sub Components
import ProfileCard from "./ProfileCard";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  content: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

export default function ProfileList() {
  const navigation = useNavigation();
  const profiles = [
    { id: 1, name: 'John Doe', bio: 'Software engineer with a passion for gaming and AI.', icon: 'https://picsum.photos/500/500?random=1', otherData: {} },
    { id: 2, name: 'Emily Smith', bio: 'React Native developer building cross-platform apps.', icon: 'https://picsum.photos/200/300?random=2', otherData: {} },
    { id: 3, name: 'Michael Johnson', bio: 'Music producer and guitarist with 10 years of experience.', icon: 'https://picsum.photos/200/300?random=3', otherData: {} },
    { id: 4, name: 'Sarah Lee', bio: 'Certified fitness coach and nutrition expert.', icon: 'https://picsum.photos/200/300?random=4', otherData: {} },
    { id: 5, name: 'David Kim', bio: 'Tech entrepreneur and startup advisor.', icon: 'https://picsum.photos/200/300?random=5', otherData: {} },
    { id: 6, name: 'Jessica Brown', bio: 'Avid reader and aspiring author.', icon: 'https://picsum.photos/200/300?random=6', otherData: {} },
    { id: 7, name: 'Chris Wilson', bio: 'Film critic and movie enthusiast.', icon: 'https://picsum.photos/200/300?random=7', otherData: {} },
    { id: 8, name: 'Laura Martinez', bio: 'Professional photographer specializing in landscapes.', icon: 'https://picsum.photos/200/300?random=8', otherData: {} },
    { id: 9, name: 'Robert Anderson', bio: 'Crypto investor and blockchain consultant.', icon: 'https://picsum.photos/200/300?random=9', otherData: {} },
    { id: 10, name: 'Sophia White', bio: 'AI researcher working on neural networks.', icon: 'https://picsum.photos/200/300?random=10', otherData: {} },
    { id: 11, name: 'Daniel Harris', bio: 'Startup founder focusing on sustainable tech.', icon: 'https://picsum.photos/200/300?random=11', otherData: {} },
    { id: 12, name: 'Olivia Thompson', bio: 'Outdoor adventurer and travel blogger.', icon: 'https://picsum.photos/200/300?random=12', otherData: {} }
];

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {profiles.map((profile) => (
          <ProfileCard 
            key={profile.id} 
            name={profile.name} 
            icon={profile.icon}
            onPress={() => navigation.navigate('ProfilePage', { profile })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
