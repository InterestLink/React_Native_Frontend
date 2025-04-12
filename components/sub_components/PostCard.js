import React, { useState } from "react";
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Share 
} from "react-native";
import { likePost, unlikePost, savePost, unSavePost, createComment, getComments } from "../../services/api";
import { useAuthContext } from "../../components/GlobalVariables";

const PostCard = ({ id, community, username, content, image, tags }) => {
  const { userId } = useAuthContext();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost({ userId, postId: id });
        setLikes(likes - 1);
      } else {
        await likePost({ userId, postId: id });
        setLikes(likes + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  const handleSave = () => {
    const handleSave = async () => {
      try {
        if (saved) {
          await unSavePost({ userId, postId: id });
        } else {
          await savePost({ userId, postId: id });
        }
        setSaved(!saved);
      } catch (error) {
        console.log("Save error:", error);
      }
    };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this post from ${username} in ${community}: "${content}"`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleComment = async () => {
    try {
      const commentData = await getComments({ postId: id });
      setComments(commentData);
      console.log("Navigate to comment screen with:", commentData);
    } catch (error) {
      console.log("Comment load error:", error);
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Community Name */}
      <Text style={styles.community}>{community}</Text>

      {/* Username */}
      <Text style={styles.username}>{username}</Text>

      {/* Post Content */}
      <Text style={styles.content}>{content}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <FlatList
          data={tags}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.tag}>#{item}</Text>}
          contentContainerStyle={styles.tagsContainer}
        />
      )}

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
  community: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 2,
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
  tagsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#eee",
    color: "#333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    fontSize: 12,
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
}
export default PostCard;
