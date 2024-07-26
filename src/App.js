import LoginPage from "./pages/LoginPage";
import HomeMenuPage from "./pages/HomeMenuPage.js";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BudgetTemplate from "./pages/BudgetTemplate.js";

function App() {
  // State to track authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tracks the loged-in user
  const [currentUser, setCurrentUser] = useState([]);

  // handles successful authentication
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
      {isLoggedIn ? (
        <Navigate to="/home" replace />
      ) : (
        <Navigate to="/login" replace />
      )}

      {/*Begining of the Routes*/}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={<HomeMenuPage currentUser={currentUser} />}
        />

        <Route path="/budget-template" element={<BudgetTemplate />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      {/*End of the Routes*/}
    </Router>
  );
}

export default App;
