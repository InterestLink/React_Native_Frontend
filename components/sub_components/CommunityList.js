// CommunityList.js
import * as React from 'react';
import { View, ScrollView, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sub Components
import CommunityCard from "./CommunityCard.js";

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

export default function Communities() {
  const navigation = useNavigation();
  const communities = [
    { id: 1, name: 'Gaming Hub', icon: 'https://picsum.photos/500/500?random=1' },
    { id: 2, name: 'React Native Devs', icon: 'https://picsum.photos/200/300?random=2' },
    { id: 3, name: 'Music Lovers', icon: 'https://picsum.photos/200/300?random=3' },
    { id: 4, name: 'Fitness Enthusiasts', icon: 'https://picsum.photos/200/300?random=4' },
    { id: 5, name: 'Tech Innovators', icon: 'https://picsum.photos/200/300?random=5' },
    { id: 6, name: 'Book Readers', icon: 'https://picsum.photos/200/300?random=6' },
    { id: 7, name: 'Movie Buffs', icon: 'https://picsum.photos/200/300?random=7' },
    { id: 8, name: 'Photography Pros', icon: 'https://picsum.photos/200/300?random=8' },
    { id: 9, name: 'Crypto Traders', icon: 'https://picsum.photos/200/300?random=9' },
    { id: 10, name: 'AI Enthusiasts', icon: 'https://picsum.photos/200/300?random=10' },
    { id: 11, name: 'Startup Founders', icon: 'https://picsum.photos/200/300?random=11' },
    { id: 12, name: 'Outdoor Adventurers', icon: 'https://picsum.photos/200/300?random=12' }
  ];

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {communities.map((community) => (
          <CommunityCard 
            key={community.id} 
            name={community.name} 
            icon={community.icon}
            onPress={() => navigation.navigate('CommunityPage', { community })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
