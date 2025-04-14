import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { getPosts } from '../../services/api';
import PostCard from './PostCard';

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts({ id: userId, isUser: true }); // Fetch posts based on the userId passed from Profile component.

      // Log the API response to inspect the data structure
      console.log(data);

      // Assuming the API returns an array of posts directly or wrapped in a response
      const postsArray = Array.isArray(data) ? data : Array.isArray(data?.body) ? data.body : [];

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
  }, [userId]); // Fetch posts whenever userId changes.

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderItem = ({ item }) => (
    <PostCard
      id={item?.post_id} // Ensure post_id exists in the item
      content={item?.content}
      image={item?.image}
      likeCount={item?.likes}
      username={item?.username}
      community={item?.name}
      profile_picture={item?.profile_picture}
      tags={item?.tags || []} // Ensure tags are handled if returned
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
      keyExtractor={(item) => item?.post_id ? item.post_id.toString() : item.id?.toString() || Math.random().toString()} // Ensure fallback key
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
