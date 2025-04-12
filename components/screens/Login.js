import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { auth } from "../../services/firebase/firebase"; // Importing auth from firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFonts } from "expo-font"; // Importing useFonts from expo-font

export default function Login({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // Username state
  const [displayName, setDisplayName] = useState(""); // Display name state
  const [isSignup, setIsSignup] = useState(false); // Toggle between modes
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (isSignup && (!username || !displayName || password !== confirmPassword)) {
      Alert.alert("Error", "Please fill in all fields and make sure passwords match!");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      if (isSignup) {
        // Signup
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully!");
      }
      onLogin(); // Call the login function passed as prop
    } catch (error) {
      console.error("Auth error:", error);
      Alert.alert("Authentication Error", error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGuestLogin = () => {
    console.log("Continuing as guest");
    onLogin();
  };

  const [fontsLoaded] = useFonts({
    "le-murmure": require("../../assets/fonts/le-murmure.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>InterestLink</Text>

      {/* Email Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Username Field (Signup only) */}
      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      )}

      {/* Display Name Field (Signup only) */}
      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
        />
      )}

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirm Password (Signup only) */}
      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      {/* Auth Button */}
      <Button
        title={isLoading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        onPress={handleAuth}
        disabled={isLoading} // Disable button while loading
      />

      {/* Toggle Link */}
      <TouchableOpacity
        onPress={() => setIsSignup(!isSignup)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {isSignup
            ? "Already have an account? Login"
            : "Need an account? Sign up"}
        </Text>
      </TouchableOpacity>

      {/* Guest Login */}
      <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontFamily: "le-murmure",
    fontSize: 50,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleButton: {
    marginTop: 15,
    alignItems: "center",
  },
  toggleText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  guestButton: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  guestText: {
    color: "tomato",
    fontWeight: "bold",
  },
});
