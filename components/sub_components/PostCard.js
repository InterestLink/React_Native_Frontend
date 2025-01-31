import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PostCard = ({ username, content, image }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.content}>{content}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    marginTop: 5,
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default PostCard;