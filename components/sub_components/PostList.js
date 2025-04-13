import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { getPosts } from '../../services/api';
import PostCard from './PostCard';

const PostList = ({ id, isUser = false, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts({
        id,
        isUser,
      });

      // Handle either raw or wrapped response
      const postsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.body)
        ? data.body
        : [];

      setPosts(postsArray);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

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
      tags={[]} // Update if tags are returned later
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />;
  }

  if (!posts.length) {
    return <Text style={styles.emptyText}>No posts to show.</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => (item?.post_id ? item.post_id.toString() : index.toString())}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
});

export default PostList;
