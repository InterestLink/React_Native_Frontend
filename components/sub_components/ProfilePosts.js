import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PostCard from './PostCard';

// Sample data for posts
const posts = [
  { id: 1, username: "User1", content: "Post 1 content goes here", image: 'https://example.com/image1.jpg' },
  { id: 2, username: "User2", content: "Post 2 content goes here", image: 'https://example.com/image2.jpg' },
  { id: 3, username: "User3", content: "Post 3 content goes here", image: 'https://example.com/image3.jpg' },
];

const ProfilePosts = () => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false} overScrollMode='never'>
      {posts.map(post => (
        <PostCard
          key={post.id}
          username={post.username}
          content={post.content}
          image={post.image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProfilePosts;
