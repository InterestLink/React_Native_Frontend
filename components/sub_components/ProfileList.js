import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sub Components
import ProfileCard from "./ProfileCard";
import { getCommunityMembers } from "../../services/api";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Stack vertically
  },
});

export default function ProfileList({ community_id }) {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getCommunityMembers({ community_id: community_id });
        setProfiles(data);
        console.warn(data);
      } catch (error) {
        console.error("Failed to load profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [community_id]);

  if (loading) {
    return (
      <View
        style={[
          styles.pageContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {profiles.map((profile) => {
          const profileData = {
            user_id: profile.user_id,
            display_name: profile.username || "Unnamed",
            icon: profile.profile_picture || null,
            username: profile.username || "Anonymous",
            bio: profile.bio || "",
            followers: profile.followers || 0,
            following: profile.following || 0,
            communities: profile.communities || 0,
          };

          return (
            <ProfileCard
              key={profile.user_id}
              name={profileData.display_name}
              icon={profileData.icon}
              onPress={() =>
                navigation.navigate("UserProfile", { profileData })
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
