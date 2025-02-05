import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CommunityPage({ route }) {
  const { community } = route.params; // Get the passed community data

  return (
    <View style={styles.container}>
      <Image source={{ uri: community.icon }} style={styles.image} />
      <Text style={styles.title}>{community.name}</Text>
      <Text style={styles.description}>
        More details about {community.name} will be displayed here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
