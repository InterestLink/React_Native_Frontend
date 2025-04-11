// CommunityList.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommunityCard from "./CommunityCard.js";
import { getCommunities } from "../../services/api.js";

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

export default function Communities( userId ) {
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with the actual userId if needed
    const fetchCommunities = async () => {
      try {
        const data = await getCommunities({ userId }); // TODO: REPLACE USER ID HERE GUYSSSSS
        setCommunities(data);
      } catch (error) {
        console.error("Failed to load communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

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