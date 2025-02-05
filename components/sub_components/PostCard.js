import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
/*
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

export default PostCard;*/

const PostCard = ({ username, content, image }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    console.log("Share functionality to be implemented");
  };

  const handleComment = () => {
    console.log("Navigate to comment section");
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.content}>{content}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <Image
            source={liked ? require("../../assets/images/like-filled.png") : require("../../assets/images/like.png")}
            style={styles.icon}
          />
          <Text style={styles.likeCount}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleComment} style={styles.actionButton}>
          <Image source={require("../../assets/images/comment.png")} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <Image source={require("../../assets/images/share.png")} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
          <Image
            source={saved ? require("../../assets/images/saved.png") : require("../../assets/images/save.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default PostCard;