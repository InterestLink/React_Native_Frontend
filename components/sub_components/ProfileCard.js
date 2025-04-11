import React, { useState } from "react";
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Share,
  TextInput, ActivityIndicator
} from "react-native";

const PostCard = ({ id, username, content, image }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
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

  const toggleComments = async () => {
    if (!showComments) {
      // Fetch comments when opening the comment section
      try {
        setCommentLoading(true);
        const response = getComments(id);
        const data = await response.json();
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setCommentLoading(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    // Add comment (Userid, username, content, postId)

    {/*if (!newComment.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch('YOUR_API_GATEWAY_ENDPOINT/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          author: username // You might want to use the actual logged-in user here
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        setComments([...comments, result.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }*/}
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

        <TouchableOpacity onPress={toggleComments} style={styles.actionButton}>
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

      {/* Comment Section */}
      {showComments && (
        <View style={styles.commentSection}>
          {commentLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.comment}>
                    <Text style={styles.commentAuthor}>{item.author}:</Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.noComments}>No comments yet</Text>
                }
              />
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                />
                <TouchableOpacity 
                  onPress={handleAddComment} 
                  style={styles.commentButton}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.commentButtonText}>Post</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
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
  commentSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    flex: 1,
  },
  noComments: {
    textAlign: "center",
    color: "#999",
    padding: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  commentButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PostCard;