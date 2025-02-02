import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Communities from "./screens/Communities";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";

// Sub Components
import MainHeader from "./sub_components/MainHeader";

// Screen names
const communityName = "Communities";
const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} // Hide the header
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }} // Hide the header
      />
    </ProfileStack.Navigator>
  )
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
          tabBarStyle: { paddingBottom: 5, height: 80, paddingTop: 15 },
          header: () => <MainHeader />,
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={searchName} component={Search} />
        <Tab.Screen name={communityName} component={Communities} />
        <Tab.Screen 
          name={profileName} 
          component={ProfileStackScreen}
          options={({ route }) => ({
            tabBarVisible: route.state 
              ? route.state.index === 0 // Hide the tab bar when navigating to the EditProfile screen
              : true,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
