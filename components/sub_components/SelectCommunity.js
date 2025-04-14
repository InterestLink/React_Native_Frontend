import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CommunityCard from './CommunityCard';
import { getUserCommunities } from '../../services/api.js';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  content: {
    flexWrap: 'column',
    paddingVertical: 10,
    flexGrow: 1,
  },
});

export default function SelectCommunity({ userId, onCommunitySelect }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const idToUse = userId || 1;

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await getUserCommunities({ user_id: idToUse });
        const list = Array.isArray(data) ? data : data.communities || [];
        setCommunities(list);
      } catch (error) {
        console.error('Failed to load communities:', error);
      } finally {
        setLoading(false);
      }
    };

    if (idToUse) {
      fetchCommunities();
    }
  }, [idToUse]);

  if (loading) {
    return (
      <View style={[styles.pageContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!Array.isArray(communities)) {
    return (
      <View style={styles.pageContainer}>
        <Text style={{ color: 'red' }}>Invalid data format</Text>
      </View>
    );
  }

  if (communities.length === 0) {
    return (
      <View style={styles.pageContainer}>
        <Text style={{ color: '#777', fontStyle: 'italic' }}>
          You're not in any communities yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.content}>
        {communities.map((community) => (
          <CommunityCard
            key={community.community_id}
            name={community.name}
            icon={community.community_picture}
            onPress={() => {
              if (onCommunitySelect) {
                onCommunitySelect(community);
              }
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
