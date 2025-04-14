import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { getHomepage } from "../../services/api";
import PostCard from "../sub_components/PostCard";
import auth, { useAuth } from "../../services/firebase/useAuth"

const Home = () => {
  const {user} = useAuth()
  const userId = user?.uid || null
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getHomepage({
        user_id: userId
      });

      if (Array.isArray(data)) {
        setPosts(data);
      } else if (Array.isArray(data.body)) {
        setPosts(data.body);
      } else {
        console.warn("Unexpected post response format:", data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error.message || error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderItem = ({ item }) => (
    <PostCard
      id={item.post_id}
      content={item.content}
      image={item.image}
      likeCount={item.likes} 
      username={item.username} 
      community={item.name}
      profile_picture={item.profile_picture}
      tags={[]} // Empty array if tags aren't part of the payload
    />
  );
  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts to show yet.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#555",
  },
});

export default Home;
