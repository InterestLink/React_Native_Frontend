import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import DefaultHome from './components/screens/DefaultHome';
import Login from './components/screens/Login';

function App() {
  // Changed these defaults to false
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Now defaults to false

  if (isFirstTimeUser) {
    return <DefaultHome />;
  }

  return (
    isLoggedIn ? <MainContainer /> : <Login onLogin={() => setIsLoggedIn(true)}/>
  );
}

export default App;