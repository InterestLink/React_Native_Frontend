import React, { useState, useEffect } from "react";
import MainContainer from "./components/MainContainer";
import DefaultHome from "./components/screens/DefaultHome";
import Login from "./components/screens/Login";
import { auth } from "./services/firebase/firebase"; // Importing auth from firebase
import { onAuthStateChanged } from "firebase/auth"; // Import firebase function for auth state

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [loading, setLoading] = useState(true); // Track loading state

  // Firebase auth state persistence
  useEffect(() => {
    // Check the auth state when the app first loads
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        setIsLoggedIn(true); // Set the state to logged in
      } else {
        console.log("No user logged in");
        setIsLoggedIn(false); // No user logged in
      }
      setLoading(false); // Done with loading after checking auth state
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // If we're still loading, display a loading screen or empty component
  if (loading) {
    return null; // Or you can return a loading spinner here
  }

  // Handle first-time user check (optional, can be based on Firebase logic)
  const isFirstTimeUser = false; // Add your own first-time user logic if needed

  return isFirstTimeUser ? (
    <DefaultHome />
  ) : isLoggedIn ? (
    // If logged in, show the MainContainer
    <MainContainer />
  ) : (
    // If not logged in, show the Login screen
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}