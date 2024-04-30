import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
  console.log(isLoggedIn);

  // Function to handle successful authentication
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Move Navigate outside of Routes */}
      {isLoggedIn ? (
        <Navigate to="/home" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
      <Routes>
        {/* Render LoginPage and pass handleLoginSuccess function */}
        <Route
          path="/login"
          element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
        />

        {/* If authenticated, render HomePage */}
        <Route path="/home" element={<HomePage />} />

        {/* Redirect to login page if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
