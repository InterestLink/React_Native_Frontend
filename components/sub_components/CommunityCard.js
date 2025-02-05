import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CommunityCard = ({ name, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={{ uri: icon }} style={styles.icon} />
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 12,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
});

export default CommunityCard;
