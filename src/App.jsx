import React, { useState } from 'react';
import ChatbotScreen from './Components/ChatbotSceen.jsx'; // Make sure the path is correct
import LoginPage from './Components/LoginPage.jsx'; // Make sure the path is correct

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <ChatbotScreen onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;