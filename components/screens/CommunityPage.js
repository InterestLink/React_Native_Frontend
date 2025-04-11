import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileList from '../sub_components/ProfileList';
import PostList from '../sub_components/PostList';



// dummy screens for posts and members
const PostsScreen = () => (
  <View style={styles.tabContent}>
    <PostList id={456} isUser={false} /> {/* TODO: GET COMMUNITY ID HERE!!!!!!!!!!!!!! */}
  </View>
);

const MembersScreen = () => (
  <View style={styles.tabContent}>
    <ProfileList id={456} isUser={false} /> {/* TODO: GET COMMUNITY ID HERE!!!!!!!!!!!!!! */}
  </View>
);

const Tab = createMaterialTopTabNavigator();


export default function CommunityPage({ route }) {
  const { community } = route.params;

  return (
    <View style={styles.container}>
      {/* Community Header */}
      <Image source={{ uri: community.icon }} style={styles.image} />
      <Text style={styles.title}>{community.name}</Text>
      <Text style={styles.description}>
        More details about {community.name} will be displayed here.
      </Text>

      {/* Tabs for Posts and Members */}
      <View style={{ flex: 1, width: '100%' }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#000' },
          }}
        >
          <Tab.Screen name="Posts" component={PostsScreen} />
          <Tab.Screen name="Members" component={MembersScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
});