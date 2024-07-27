import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomeMenuPage from './pages/HomeMenuPage';
import BudgetTemplate from './pages/BudgetTemplate';

function App() {
  // State to track authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handles successful authentication
  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomeMenuPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/budget-template" 
          element={isLoggedIn ? <BudgetTemplate /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
