import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import PostCard from "./PostCard";
import { getPosts } from "../../services/api"; // Make sure the import path is correct

const PostList = ({ id, isUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ id, isUser });
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id, isUser]);

  if (loading) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      {posts.map((post) => (
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

export default PostList;
