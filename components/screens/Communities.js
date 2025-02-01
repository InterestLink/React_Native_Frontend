import * as React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

// Sub Components
import CommunityList from '../sub_components/CommunityList';
import RecommendedCommunityCard from '../sub_components/RecommendedCommunityCard.js';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
  recommendedContainer: {
    marginBottom: 20,
  },
  recommendedScroll: {
    paddingLeft: 5,
  },
  communityListContainer: {
    flex: 1,
  },
});

const RecommendedCommunityCards = [
  { id: 101, name: 'Art & Design', icon: 'https://picsum.photos/100?random=21' },
  { id: 102, name: 'Science Talk', icon: 'https://picsum.photos/100?random=22' },
  { id: 103, name: 'History Buffs', icon: 'https://picsum.photos/100?random=23' },
  { id: 104, name: 'Space Exploration', icon: 'https://picsum.photos/100?random=24' },
];

export default function Communities({ navigation }) {
  return (
    <View style={styles.pageContainer}>
      {/* Recommended Communities */}
      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Recommended Communities</Text>
        <ScrollView
          horizontal
          bounces={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedScroll}
        >
          {RecommendedCommunityCards.map((community) => (
            <RecommendedCommunityCard 
              key={community.id} 
              name={community.name} 
              icon={community.icon} 
            />
          ))}
        </ScrollView>
      </View>

      {/* Communities You’re Following */}
      <Text style={styles.sectionTitle}>Communities You're Following</Text>
      <View style={styles.communityListContainer}>
        <CommunityList />
      </View>
    </View>
  );
}
