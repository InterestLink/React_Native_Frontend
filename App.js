import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import DefaultHome from './components/screens/DefaultHome';
import Login from './components/screens/Login';

function App() {
  // Testing vars for routing, we can use auth later when backend is ready
  const isFirstTimeUser = false;
  const isLoggedIn = true;

  if (isFirstTimeUser) {
    return <DefaultHome />;
  }

  return (
    isLoggedIn ? <MainContainer /> : <Login/>
  );
}

export default App;
