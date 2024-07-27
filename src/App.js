import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeMenuPage from "./pages/HomeMenuPage";
import BudgetTemplate from "./pages/BudgetTemplate";
import Statistics from "./pages/Statistics";
import BudgetCalculator from "./pages/BudgetCalculator";
import Navbar from "./pages/Navbar";

function App() {
  // State to store authenticated user data retrieved from the server
  const [userData, setUserData] = useState([]);

  // State to track authentication status: true if logged in, false otherwise
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Handles successful authentication
  - Updates logged-in status
  - Sets current user data into the state */
  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  console.log(userData); // Log user data for debugging

  return (
    <Router>
      <Navbar /> {/*Navbar component */}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <HomeMenuPage userData={userData} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/budget-template"
          element={
            isLoggedIn ? <BudgetTemplate userData={userData}/> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/statistics"
          element={
            isLoggedIn ? <Statistics userData={userData}/> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/budget-Calculator"
          element={
            isLoggedIn ? <BudgetCalculator userData={userData}/> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
