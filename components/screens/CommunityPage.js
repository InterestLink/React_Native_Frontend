import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileList from "../sub_components/ProfileList";
import PostList from "../sub_components/PostList";
import { useAuth } from "../../services/firebase/useAuth";
import { postJoinCommunity, getUserCommunities } from "../../services/api";

// dummy screens for posts and members
const PostsScreen = ({ community_id }) => (
  <View style={styles.tabContent}>
    {/* Passing community_id to PostList and setting isUser to false */}
    <PostList community_id={community_id} isUser={false} />
  </View>
);

const MembersScreen = ({ community_id }) => (
  <View style={styles.tabContent}>
    <ProfileList community_id={community_id} />
  </View>
);

const Tab = createMaterialTopTabNavigator();

export default function CommunityPage({ route }) {
  const { community } = route.params;
  const community_id = community.community_id;

  const { user } = useAuth();
  const userId = user?.uid || null;

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await getUserCommunities({user_id: userId});
        const isJoined = res?.some((c) => c.community_id === community_id);
        setJoined((isJoined));
      } catch (err) {
        console.error("Failed to fetch communities", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) checkMembership();
  }, [community_id, userId]);

  const handleToggleJoin = async () => {
    try {
      console.log("Sending to API:", { user_id: userId, community_id, joined: !joined });
      await postJoinCommunity({ user_id: userId, community_id, joined: !joined });
      setJoined(!joined);
    } catch (err) {
      console.error("Join/Leave failed", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Community Header */}
      <Image source={{ uri: community.icon }} style={styles.image} />
      <Text style={styles.title}>{community.name}</Text>
      <Text style={styles.description}>
        More details about {community.name} will be displayed here.
      </Text>

      {/* Join/Leave Button */}
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <TouchableOpacity
        style={[
          styles.toggleButton,
          joined && styles.activeToggle
        ]}
        onPress={handleToggleJoin}
      >
        <Text style={[styles.toggleText, joined && styles.activeToggleText]}>
          {joined ? "Leave" : "Join"}
        </Text>
      </TouchableOpacity>
    )}

      {/* Tabs for Posts and Members */}
      <View style={{ flex: 1, width: "100%" }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "#fff" },
            tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
            tabBarIndicatorStyle: { backgroundColor: "#000" },
          }}
        >
          <Tab.Screen name="Posts">
            {() => <PostsScreen community_id={community_id} />}
          </Tab.Screen>
          <Tab.Screen name="Members">
            {() => <MembersScreen community_id={community_id} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  activeToggle: {
    backgroundColor: 'tomato',
    borderColor: 'tomato',
  },
  toggleText: {
    color: '#333',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#fff',
  },
});
