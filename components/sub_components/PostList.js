import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import PostCard from "./PostCard";
import { getPosts } from "../../services/api"; // Make sure the import path is correct

const PostList = ({ id, isUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ id, isUser });

        // ✅ Defensive check in case data is null/undefined or not an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.warn("getPosts() did not return an array:", data);
          setPosts([]); // fallback to empty
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]); // fallback to empty even on error
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
      {(posts || []).length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id || Math.random().toString()}
            username={post.username}
            content={post.content}
            image={post.image}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No posts to display.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
});

export default PostList;
