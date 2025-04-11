import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import PostCard from "../sub_components/PostCard";

export default function Home({ navigation }) {
  const [selectedCommunity, setSelectedCommunity] = useState("All");

  const posts = [
    { community: "RapEnjoyers", id: "1", username: "ChiefKeefFan202", content: "Wake up, gotta thank the day, yeah, I’m blessed now", tags:["tag1", "chiefkeef","music"]},
    { community: "Kony2012 Enthusiasts", id: "2", username: "user2", content: "#kony2012" },
    { community: "Figma Enthusiasts", id: "3", username: "keenan", content: "I love figma!" },
  ];

  const communities = ["All", ...new Set(posts.map(post => post.community))];

  const filteredPosts = selectedCommunity === "All"
    ? posts
    : posts.filter(post => post.community === selectedCommunity);

  return (
    <View style={styles.container}>
      {/* Scrollable Filter Options */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
        {communities.map((community) => (
          <TouchableOpacity
            key={community}
            style={[styles.filterButton, selectedCommunity === community && styles.selectedButton]}
            onPress={() => setSelectedCommunity(community)}
          >
            <Text style={styles.filterText}>{community}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Post List */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard {...item} />}
        contentContainerStyle={styles.postList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
  },
  filterContainer: {
    flexDirection: "row",
    paddingVertical: 10 ,
    paddingHorizontal: 5,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    flexShrink: 1,
    alignSelf: "flex-start"
  },
  selectedButton: {
    backgroundColor: "#007bff",
  },
  filterText: {
    color: "#000",
    lineHeight: 18,
    fontSize: 14,
  },
  postList: {
    flexGrow: 1,
  },
});