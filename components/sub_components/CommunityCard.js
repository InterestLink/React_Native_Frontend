import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CommunityCard = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Image source={{ uri: icon }} style={styles.icon} />
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 16, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    marginVertical: 5,
    width: '100%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16, 
    elevation: 2
    
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
