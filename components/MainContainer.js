import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Communities from "./screens/Communities";
import CommunityPage from "./screens/CommunityPage";
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
const Stack = createStackNavigator();


// Stack Navigator for Communities
function CommunitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Communities" component={Communities} />
      <Stack.Screen name="CommunityPage" component={CommunityPage} />
    </Stack.Navigator>
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
          tabBarStyle: { paddingBottom: 5, height: 80, paddingTop: 15 },
          header: () => <MainHeader />,
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={searchName} component={Search} />
        <Tab.Screen name={communityName} component={CommunitiesStack} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
