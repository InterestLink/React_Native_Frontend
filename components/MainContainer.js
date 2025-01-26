import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

// Screens
import Community from "./screens/Community";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile";

// Screen names
const communityName = "Communities";
const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

// Custom Header Component used below
function CustomHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "tomato",
      }}
    >
      <Ionicons
        name="link"
        size={24}
        color="white"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
        InterestLink
      </Text>
    </View>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === searchName) {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === communityName) {
              iconName = focused ? "earth" : "earth-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingBottom: 5, height: 60 },
          header: () => <CustomHeader />,
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={searchName} component={Search} />
        <Tab.Screen name={communityName} component={Community} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
