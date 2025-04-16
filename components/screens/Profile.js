import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostList from "../sub_components/PostList";
import { useAuth } from "../../services/firebase/useAuth";
import { getUser, postFollowUser } from "../../services/api";

const Profile = ({ route, navigation }) => {
  const { user } = useAuth();
  const routeData = route?.params?.profileData;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("Posts");
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const isFocused = useIsFocused();
  const userId = routeData?.id || user.uid;
  const isOwnProfile = user?.uid === userId;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const fetched = await getUser({ user_id: userId, returnAll: true });
        console.log('getUser', fetched);
        console.log("---------------------Followers array:", fetched.followers);
        if (fetched) {
          setProfileData(fetched);
          if (!isOwnProfile && Array.isArray(fetched.followers)) {
            const isFollowingUser = fetched.followers.includes(user.uid);
            setIsFollowing(isFollowingUser);
          }             
        } else {
          setProfileData(routeData || null);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) fetchProfile();
  }, [isFocused, userId]);

  const handleToggleFollow = async () => {
    if (!user?.uid || !userId || isOwnProfile) return;
    
    setFollowLoading(true);
    
    try {
      const res = await postFollowUser({
        follower_id: user.uid,
        following_id: userId,
        follow: !isFollowing,
      });
      
      // Update isFollowing state
      setIsFollowing(prev => !prev);
      
      // Directly update follower count based on action
      if (isFollowing) {
        // If unfollowing, decrease the follower count
        setProfileData(prevData => ({
          ...prevData,
          followerCount: prevData.followerCount - 1,
        }));
      } else {
        // If following, increase the follower count
        setProfileData(prevData => ({
          ...prevData,
          followerCount: prevData.followerCount + 1,
        }));
      }
      
    } catch (err) {
      console.error("Follow toggle failed:", err);
    } finally {
      setFollowLoading(false);
    }
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${profileData?.display_name || profileData?.username}'s profile (@${profileData?.username}) on our app!`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case "Posts":
        return <PostList route={{ params: { data: { id: userId, isUser: true } } }} />
      case "Saved":
        return <PostList route={{ params: { data: { id: userId, isUser: true, userSaved: true } } }} />
      case "Liked":
        return <PostList route={{ params: { data: { id: userId, isUser: true, userLiked: true } } }} />
      default:
        return <Text>Here are the user's posts...</Text>;
    }
  };
  

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  if (!profileData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Profile not found.
        </Text>
      </SafeAreaView>
    );
  }

  const {
    username = "defaultUsername",
    display_name = "Default Name",
    bio = "This user has no bio yet.",
    profile_picture = null,
    communityCount = 0,
    followerCount = 0,
    followingCount = 0,
  } = profileData;

  const handleEdit = () => navigation.navigate("EditProfile", { profileData });
  const handleSettings = () => navigation.navigate("Settings");

  return (
    <SafeAreaView style={styles.container}>
      {isOwnProfile && (
        <TouchableOpacity
          onPress={handleSettings}
          style={styles.settingsIconContainer}
        >
          <Image
            source={require("../../assets/images/settings.png")}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileImageAndTextContainer}>
            <Image
              source={
                profile_picture
                  ? { uri: profile_picture }
                  : require("../../assets/images/default_pfp.jpg")
              }
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <View style={styles.nameAndEditContainer}>
                <TouchableOpacity style={styles.statItem}>
                  <Text style={styles.statText}>Communities</Text>
                  <Text style={styles.statCount}>{communityCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem}>
                  <Text style={styles.statText}>Followers</Text>
                  <Text style={styles.statCount}>{followerCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem}>
                  <Text style={styles.statText}>Following</Text>
                  <Text style={styles.statCount}>{followingCount}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.nameText}>{display_name || username}</Text>
          {isOwnProfile && (
            <TouchableOpacity onPress={handleEdit}>
              <Image
                source={require("../../assets/images/icons8-edit-24.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.usernameAndShareContainer}>
          <Text style={styles.usernameText}>@{username}</Text>
          <TouchableOpacity onPress={handleShare}>
            <Image
              source={require("../../assets/images/icons8-share-24.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={styles.bioText}
          numberOfLines={isBioExpanded ? undefined : 1}
        >
          {bio}
        </Text>

        <TouchableOpacity
          onPress={() => setIsBioExpanded(!isBioExpanded)}
          style={styles.expandTextContainer}
        >
          <Text style={styles.expandText}>
            {isBioExpanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>

        {/* Follow/Unfollow */}
        {!isOwnProfile && (
          followLoading ? (
          <ActivityIndicator size="small" color="#000" />
           ) : (
           <TouchableOpacity
           style={[
            styles.toggleButton,
            isFollowing && styles.activeToggle
          ]}
          onPress={handleToggleFollow}
          >
            <Text style={[
              styles.toggleText,
              isFollowing && styles.activeToggleText
              ]}>
                {isFollowing ? "Unfollow" : "Follow"}
                </Text>
                </TouchableOpacity>
                )
                )}

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => setSelectedView("Posts")}
          >
            <Text style={styles.statText}>Posts</Text>
          </TouchableOpacity>
          {isOwnProfile && (
            <>
              <TouchableOpacity
                style={styles.statItem}
                onPress={() => setSelectedView("Saved")}
              >
                <Text style={styles.statText}>Saved</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statItem}
                onPress={() => setSelectedView("Liked")}
              >
                <Text style={styles.statText}>Liked</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.separator} />
        <View style={styles.contentArea}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { flex: 1, padding: 16 },
  profileInfoContainer: { marginBottom: 16 },
  profileImageAndTextContainer: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  textContainer: { marginLeft: 12 },
  nameAndEditContainer: { flexDirection: "row", alignItems: "center" },
  usernameAndShareContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  nameText: { fontSize: 20, fontWeight: "bold", marginRight: 8 },
  usernameText: { fontSize: 16, fontWeight: "bold", marginRight: 8 },
  bioText: { fontSize: 16, color: "#555", marginTop: 8 },
  icon: { width: 24, height: 24, marginHorizontal: 8 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  statItem: { alignItems: "center", marginHorizontal: 8 },
  statText: { fontSize: 16, fontWeight: "bold" },
  statCount: { fontSize: 14, color: "#888" },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    width: "80%",
    alignSelf: "center",
    marginVertical: 16,
  },
  contentArea: { flex: 1 },
  expandTextContainer: { marginTop: 8, alignItems: "center" },
  expandText: { color: "#007BFF" },
  settingsIconContainer: { position: "absolute", top: 16, right: 16 },
  settingsIcon: { width: 24, height: 24 },
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

export default Profile;
