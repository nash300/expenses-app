import LoginPage from "./pages/LoginPage";
import BudjetCalculator from "./pages/BudjetCalculator.js";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // State to track authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tracks the loged-in user
  const [currentUser, setCurrentUser] = useState([]);

  //----------------------------------------------------------------------
  ////////////  Function to handle successful authentication  ////////////
  //----------------------------------------------------------------------
  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    // storing user details in the hook
    setCurrentUser({
      id: data.id,
      user_name: data.user_name,
      first_name: data.first_name,
    });
  };
  // updates currentUser after any changes
  useEffect(() => {}, [currentUser]);
  //______________________________________________________________________

  return (
    <Router>
      {/* Move Navigate outside of Routes */}
      {isLoggedIn ? (
        <Navigate to="/calculator" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
      <Routes>
        {/* Render LoginPage and pass handleLoginSuccess function */}
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />
        {/* If authenticated, render HomePage (calculator) */}
        <Route
          path="/calculator"
          element={<BudjetCalculator currentUser={currentUser} />}
        />
        {/* Redirect to login page if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
