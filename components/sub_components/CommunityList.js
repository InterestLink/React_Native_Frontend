import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommunityCard from './CommunityCard';
import { getCommunities } from '../../services/api.js';

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

export default function CommunityList({ userId }) { // Destructure userId from props
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        // Pass the userId to getCommunities
        const data = await getCommunities({ userId });
        setCommunities(data);
      } catch (error) {
        console.error('Failed to load communities:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch communities if userId is available
    if (userId) {
      fetchCommunities();
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={[styles.pageContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
