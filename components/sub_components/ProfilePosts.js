import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Sample data for posts
const posts = [
  { id: 1, content: "Post 1 content goes here", image: require('../../assets/images/default_pfp.jpg') },
  { id: 2, content: "Post 2 content goes here", image: require('../../assets/images/default_pfp.jpg') },
  { id: 3, content: "Post 3 content goes here", image: require('../../assets/images/default_pfp.jpg') },
];

const ProfilePosts = () => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false} overScrollMode='never'>
      {posts.map(post => (
        <View key={post.id} style={styles.postContainer}>
          <Image source={post.image} style={styles.postImage} />
          <Text style={styles.postText}>{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  postText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfilePosts;
