import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import BudgetCalculator from "./pages/BudgetCalculator";
import SelectDatePage from "./pages/SelectDatePage";
import { useBudget } from "./context files/BudgetProvider";
import CreditLoanStatistics from "./components/CreditLoanStatistics";
import "../src/Styles.css";


function App() {
  const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useBudget();

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  return (
    <div className="app-container"> {/* Apply the app-container class */}
      <Router>
        <Navbar userData={userData} />
        <div className="content"> {/* Apply the content class */}
          <Routes>
            <Route
              path="/login"
              element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
            />
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
            <Route
              path="/statistics"
              element={
                isLoggedIn ? (
                  <CreditLoanStatistics userData={userData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
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
        </div>
      </Router>
    </div>
  );
}

export default App;
