import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
// Importing pages
import LoginPage from "./pages/LoginPage";
import HomeMenuPage from "./pages/HomeMenuPage";
import Statistics from "./pages/Statistics";
import BudgetCalculator from "./pages/BudgetCalculator";
import SelectDatePage from "./pages/SelectDatePage";

function App() {
  const [userData, setUserData] = useState([]);
  // State to store authenticated user data retrieved from the server

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to track authentication status: true if logged in, false otherwise

  const handleLoginSuccess = (data) => {
    // -Handles successful authentication
    // -Updates logged-in status
    // -Sets current user data into the state
    setIsLoggedIn(true);
    setUserData(data);
  };

  console.log(userData); // Log user data for debugging

  return (
    // ROUTES --------------------------------------------------------------

    <Router>
      <Navbar userData={userData} /> {/*Navbar component */}
      <Routes>
        {/* Routes for cards ------------------------------------*/}
        {/*LOGIN PAGE*/}
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />
        {/*HOME PAGE*/}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomeMenuPage userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
       
        {/* STATISTICS PAGE*/}
        <Route
          path="/statistics"
          element={
            isLoggedIn ? (
              <Statistics userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* BUDGET CALCULATOR PAGE*/}
        <Route
          path="/budget-Calculator"
          element={
            isLoggedIn ? (
              <BudgetCalculator userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

          {/* DATE SELECTOR PAGE*/}
          <Route
          path="/select-date"
          element={
            isLoggedIn ? (
              <SelectDatePage userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        
        {/* INITIAL PAGE HANDLING*/}
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
        {/* DEFAULT*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    /**************************  END OF ROUTES  ********************************/
  );
}

export default App;
