import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

// Screens
import DefaultHome from "./screens/DefaultHome";
import Feed from "./screens/Feed";

// Screen names
const defaultHomeName = "Home";
const feedName = "Feed";

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
    <Ionicons name="link" size={24} color="white" style={{ marginRight: 10 }} />
    <Text style={
        { fontSize: 20, color: "white", fontWeight: "bold" }}>
        InterestLink
    </Text>
    </View>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={feedName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === defaultHomeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === feedName) {
              iconName = focused ? "list" : "list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingBottom: 5, height: 60 },
          header: () => <CustomHeader />,
        })}
      >
        <Tab.Screen name={defaultHomeName} component={DefaultHome} />
        <Tab.Screen name={feedName} component={Feed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
