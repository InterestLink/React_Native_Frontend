import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sub Components
import CommunityList from '../sub_components/CommunityList';
import RecommendedCommunityCard from '../sub_components/RecommendedCommunityCard.js';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  recommendedContainer: {
    width: '100%',
    marginBottom: 20,
  },
  recommendedScroll: {
    flexDirection: 'row',
    paddingLeft: 5,
    marginBottom: 10,
  },
  cardWrapper: {
    width: 300,
    height: 120,
    marginRight: 15,
    marginBottom: 15,
  },
  communityListContainer: {
    flex: 1,
    width: '100%'
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
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedScroll}
          removeClippedSubviews={true} // Ensures components outside view are not rendered
        >
          {RecommendedCommunityCards.map((community) => (
            <RecommendedCommunityCard 
              key={community.id} 
              name={community.name} 
              icon={community.icon} 
              onPress={() => navigation.navigate('CommunityPage', { community })}
              activeOpacity={.7}
              style={styles.cardWrapper}
            />
          ))}
        </ScrollView>
      </View>

      {/* Communities You’re Following */}
      <Text style={styles.sectionTitle}>Communities You're Following</Text>
      <View style={styles.communityListContainer}>
        <CommunityList navigation={navigation} />
      </View>
    </View>
  );
}
