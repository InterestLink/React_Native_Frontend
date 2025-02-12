import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 100, 
    height: 100, 
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60, 
    height: 60,
    borderRadius: 40, 
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function RecommendedCommunityCard({ name, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: icon }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
    </TouchableOpacity>
  );
}
