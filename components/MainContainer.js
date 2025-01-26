import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import DefaultHome from "./screens/DefaultHome";
import Feed from "./screens/Feed";

// Screen names
const defaultHomeName = "Home";
const feedName = "Feed";

const Tab = createBottomTabNavigator();

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
        })}
      >
        <Tab.Screen name={defaultHomeName} component={DefaultHome} />
        <Tab.Screen name={feedName} component={Feed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
