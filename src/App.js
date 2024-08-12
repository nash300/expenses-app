import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
// Importing pages
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import BudgetCalculator from "./pages/BudgetCalculator";
import SelectDatePage from "./pages/SelectDatePage";
import { useBudget } from "./context files/BudgetProvider"; // contains global variables

function App() {
  // Access context values and setters
  const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useBudget();

  // -Handles successful authentication
  // -Updates logged-in status
  // -Sets current user data into the state
  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  return (
    // ROUTES

    <Router>
      {/*Navbar component */}
      <Navbar userData={userData} />

      <Routes>
        {/*Login page*/}
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />
        {/*Home page*/}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Statistics page*/}
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
        {/* Budget calculater page*/}
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

        {/* Date selecter page*/}
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
