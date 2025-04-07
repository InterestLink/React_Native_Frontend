import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import DefaultHome from './components/screens/DefaultHome';
import Login from './components/screens/Login';
import { auth } from './firebase/firebase'; // Importing auth from firebase

function App() {
  const [isFirstTimeUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Firebase test 
  useEffect(() => {
    console.log("Firebase auth object:", auth);
    
    // Safety check
    if (!auth) {
      console.error("Firebase auth not initialized!");
      return;
    }
    
    // Check auth state persistence
    auth.onAuthStateChanged((user) => {
      console.log("Current user:", user);
    });
  }, []); // Empty dependency array = runs once on mount

  if (isFirstTimeUser) {
    return <DefaultHome />;
  }

  return (
    isLoggedIn ? <MainContainer /> : <Login onLogin={() => setIsLoggedIn(true)}/>
  );
}

export default App;