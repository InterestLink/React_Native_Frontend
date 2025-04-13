import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sub Components
import ProfileCard from "./ProfileCard";
import { getProfileLists } from "../../services/api";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  content: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexGrow: 1,
  },
});

export default function ProfileList({ id, isUser }) {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfileLists({ id, isUser });
        setProfiles(data);
      } catch (error) {
        console.error("Failed to load profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [id, isUser]);

  if (loading) {
    return (
      <View style={[styles.pageContainer, { justifyContent: "center", alignItems: "center" }]}>
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
            user_id: profile.id,
            display_name: profile.name || "Unnamed",
            icon: profile.icon || null,
            username: profile.username || "Anonymous",
            bio: profile.bio || "",
            followers: profile.followers || 0,
            following: profile.following || 0,
            communities: profile.communities || 0,
          };

          return (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              icon={profile.icon}
              onPress={() => navigation.navigate("UserProfile", { profileData })}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
