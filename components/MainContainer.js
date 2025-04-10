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
import EditProfile from "./screens/EditProfile"; // Used for editing the logged-in user's profile
import Settings from "./screens/Settings"; // Used for app settings
import Accessibility from "./screens/Accessibility"; // Placeholder for accessibility and language settings
import Help from "./screens/Help"; // Placeholder for help and support
import Login from "./screens/Login"; 
import Moderation from "./screens/Moderation"; // Placeholder for moderation settings
import ContentSettings from "./screens/ContentSettings"; // Placeholder for content settings
import About from "./screens/About"; // Placeholder for about section
import ResetPassword from "./screens/ResetPassword"; // Placeholder for reset password screen
import Account from "./screens/Account"; // Placeholder for account settings
import PrivacyAndSecurity from "./screens/PrivacyAndSecurity"; // Placeholder for privacy and security settings
import Notifications from "./screens/Notifications"; // Placeholder for notifications settings

// Sub Components
import MainHeader from "./sub_components/MainHeader";
import DirectMessages from "./screens/DirectMessages";
import ChatScreen from "./screens/ChatScreen";

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
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={Account}
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen
        name="PrivacyAndSecurity" 
        component={PrivacyAndSecurity}
        options={{ title: "Privacy and Security" }}
      />
      <Stack.Screen
        name="Notifications" 
        component={Notifications}
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="Accessibility" 
        component={Accessibility}
        options={{ title: "Accessibility" }}
      />
      <Stack.Screen
        name="Help" 
        component={Help}
        options={{ title: "Help" }}
      />
      <Stack.Screen
        name="Moderation" 
        component={Moderation}
        options={{ title: "Moderation" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword} 
        options={{ title: "Reset Password" }}
      />
      <Stack.Screen
        name="About" 
        component={About}
        options={{ title: "About InterestLink" }}
      />
      <Stack.Screen
        name="ContentSettings" 
        component={ContentSettings}
        options={{ title: "Content Settings" }}
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
        {/* Direct Message stack */}
        <RootStack.Screen
          name="DirectMessages"
          component={DirectMessages}
          options={({ route }) => ({ title: route.params?.profile?.name || 'Messages' })} 
        />
        {/* Chat Message stack */}
        <RootStack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({ title: route.params?.profile?.name || 'Chats' })} 
        />
        {/* Login screen */}
        <RootStack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Login 
            navigation={navigation} 
            onLogin={() => navigation.navigate('MainTabs')}
            />
            )}
            </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
