// mainContainer.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Communities from "./screens/Communities";
import CommunityPage from "./screens/CommunityPage";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile"; // Used in the Profile tab and for viewing other profiles
import EditProfile from "./screens/EditProfile";

// Sub Components
import MainHeader from "./sub_components/MainHeader";

const communityName = "Communities";
const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";

// Create a stack for each tab
const Stack = createStackNavigator();

// Home Stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={Home} 
        options={{ 
          header: () => <MainHeader />,
        }} 
      />
    </Stack.Navigator>
  );
}

// Search Stack
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchScreen" 
        component={Search} 
        options={{
          header: () => <MainHeader />,
        }} 
      />
    </Stack.Navigator>
  );
}

// Communities Stack (for listing communities)
function CommunitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CommunitiesScreen" 
        component={Communities} 
        options={{
          header: () => <MainHeader />,
        }} 
      />
    </Stack.Navigator>
  );
}

// Profile Stack (for logged-in user profile & edit)
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileScreen" 
        component={Profile} 
        options={{
          header: () => <MainHeader />,
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator for the main tabs
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === searchName) {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === communityName) {
            iconName = focused ? "earth" : "earth-outline";
          } else if (route.name === profileName) {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 80, paddingTop: 15 },
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={HomeStack} />
      <Tab.Screen name={searchName} component={SearchStack} />
      <Tab.Screen name={communityName} component={CommunitiesStack} />
      <Tab.Screen name={profileName} component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Root stack wraps the Tabs and extra screens accessible from anywhere
const RootStack = createStackNavigator();
export default function MainContainer() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {/* Main Tabs */}
        <RootStack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        {/* Community details screen */}
        <RootStack.Screen 
          name="CommunityPage" 
          component={CommunityPage}
          options={({ route }) => ({ title: route.params?.community?.name || 'Community' })} 
        />
        {/* Generic User Profile screen (for viewing any user's profile) */}
        <RootStack.Screen 
          name="UserProfile" 
          component={Profile}
          options={({ route }) => ({ title: route.params?.profile?.name || 'Profile' })} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
