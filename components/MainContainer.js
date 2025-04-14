// mainContainer.js
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "../services/firebase/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Communities from "./screens/Communities";
import CommunityPage from "./screens/CommunityPage";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Settings from "./screens/Settings";
import Accessibility from "./screens/Accessibility";
import Help from "./screens/Help";
import Login from "./screens/Login";
import MakePost from "./screens/MakePost";
import Moderation from "./screens/Moderation";
import ContentSettings from "./screens/ContentSettings";
import About from "./screens/About";
import ResetPassword from "./screens/ResetPassword";
import Account from "./screens/Account";
import PrivacyAndSecurity from "./screens/PrivacyAndSecurity";
import Notifications from "./screens/Notifications";
import MainHeader from "./sub_components/MainHeader";
import DirectMessages from "./screens/DirectMessages";
import ChatScreen from "./screens/ChatScreen";

// Tab names
const communityName = "Communities";
const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";

// Stacks
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

// --- Tab Stacks ---
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ header: () => <MainHeader /> }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={Search} options={{ header: () => <MainHeader /> }} />
    </Stack.Navigator>
  );
}

function EmptyScreen() {
  return null; // Placeholder for the "Add" tab
}

function CommunitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CommunitiesScreen" component={Communities} options={{ header: () => <MainHeader /> }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={Profile} options={{ header: () => <MainHeader /> }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="Settings" component={Settings} options={{ title: "Settings" }} />
      <Stack.Screen name="AccountSettings" component={Account} options={{ title: "Account Settings" }} />
      <Stack.Screen name="PrivacyAndSecurity" component={PrivacyAndSecurity} options={{ title: "Privacy and Security" }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: "Notifications" }} />
      <Stack.Screen name="Accessibility" component={Accessibility} options={{ title: "Accessibility" }} />
      <Stack.Screen name="Help" component={Help} options={{ title: "Help" }} />
      <Stack.Screen name="Moderation" component={Moderation} options={{ title: "Moderation" }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Reset Password" }} />
      <Stack.Screen name="About" component={About} options={{ title: "About InterestLink" }} />
      <Stack.Screen name="ContentSettings" component={ContentSettings} options={{ title: "Content Settings" }} />
    </Stack.Navigator>
  );
}

function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DirectMessages" component={DirectMessages} options={{ title: "Messages" }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params.conversationName })} />
    </Stack.Navigator>
  );
}

// --- Tab Navigator ---
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === homeName) iconName = focused ? "home" : "home-outline";
          else if (route.name === searchName) iconName = focused ? "search" : "search-outline";
          else if (route.name === communityName) iconName = focused ? "earth" : "earth-outline";
          else if (route.name === profileName) iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 80, paddingTop: 15, position: 'relative' },
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={HomeStack} />
      <Tab.Screen name={searchName} component={SearchStack} />
      <Tab.Screen 
        name="Add" 
        component={EmptyScreen}
        options={({ navigation, route }) => ({
          tabBarButton: ({accessibilityState}) => (
            <TouchableOpacity
              style={{
                top: -5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('MakePost')}
            >
              <Ionicons name="add-circle-outline" size={48} color={accessibilityState?.selected ? "tomato" : "gray"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name={communityName} component={CommunitiesStack} />
      <Tab.Screen name={profileName} component={ProfileStack} />
    </Tab.Navigator>
  );
}

// --- Root Navigator ---
function MainContainerContent() {

  const { user } = useAuth(); // 🔥 Moved inside the component
  const userId = user?.uid || null;

  React.useEffect(() => {
    if (user) {
      console.log("✅ Logged in UID:", userId);
    } else {
      console.log("🚫 User not logged in.");
    }
  }, [user]);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
            <RootStack.Screen name="MakePost" component={MakePost} />
            <RootStack.Screen name="CommunityPage" component={CommunityPage} />
            <RootStack.Screen name="UserProfile" component={Profile} />
            <RootStack.Screen name="Messages" component={MessagesStack} />
          </>
        ) : (
          <RootStack.Screen name="Login">
            {({ navigation }) => (
              <Login navigation={navigation} onLogin={() => navigation.replace("MainTabs")} />
            )}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// --- Exported Component with Provider ---
export default function MainContainer() {
  return (
    <AuthProvider>
      <MainContainerContent />
    </AuthProvider>
  );
}
