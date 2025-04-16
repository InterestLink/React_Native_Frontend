import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CommunityCard from "./CommunityCard";
import { getUserCommunities } from "../../services/api.js";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  content: {
    flexWrap: "column",
    paddingVertical: 10,
    flexGrow: 1,
  },
});

export default function CommunityList({ userId }) {
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const idToUse = userId || 1;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCommunities = async () => {
        try {
          const data = await getUserCommunities({ user_id: idToUse });
          console.log("Fetched data:", data);
          const list = Array.isArray(data) ? data : data.communities || [];
          if (isActive) {
            setCommunities(list);
          }
        } catch (error) {
          console.error("Failed to load communities:", error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      setLoading(true);
      fetchCommunities();

      return () => {
        isActive = false; // cleanup in case the screen unfocuses mid-request
      };
    }, [idToUse])
  );

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

  if (!Array.isArray(communities)) {
    return (
      <View style={styles.pageContainer}>
        <Text style={{ color: "red" }}>Invalid data format</Text>
      </View>
    );
  }

  if (communities.length === 0) {
    return (
      <View style={styles.pageContainer}>
        <Text style={{ color: "#777", fontStyle: "italic" }}>
          You're not in any communities yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {communities.map((community) => (
          <CommunityCard
            key={community.community_id}
            name={community.name}
            icon={community.community_picture}
            onPress={() =>
              navigation.navigate('CommunityPage', {
                community: {
                  community_id: community.community_id || community.id,
                  name: community.name || "Unnamed Community",
                  icon: community.community_picture || null,
                  description: community.description || ""
                }
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
