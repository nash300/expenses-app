import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase"; // Supabase client for database operations
import userImage from "../utilities/icons/login-icon.jpg"; // Login icon image

function LoginPage({ handleLoginSuccess }) {
  // Local state variables for username, password, and status message
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [statusText, setStatusText] = useState(""); 

  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handles login form submission
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Query Supabase to fetch user information based on the provided username
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_name", username)
        .single();

      // Check for errors in fetching user data
      if (error) {
        console.error("Supabase query error:", error); // Log error for debugging
        setStatusText("Invalid username or error fetching user.");
        return;
      }

      // Check if the user exists
      if (!data) {
        setStatusText("User not found.");
        return;
      }

      // Validate the password
      if (password !== data.password) {
        setStatusText("Incorrect password.");
        return;
      }

      // If login is successful, send user data to the parent component and navigate to home
      handleLoginSuccess(data); // Send logged-in user data to parent component
      navigate("/home"); // Redirect to home page
      setStatusText(""); // Clear status text on successful login

    } catch (error) {
      // Catch any unexpected errors
      console.error("Login error:", error); // Log error for debugging
      setStatusText("An unexpected error occurred.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card container shadow-lg p-5 border-0" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <img
            src={userImage}
            alt="Login Icon" // Descriptive alt text for accessibility
            style={{ height: "130px", width: "130px" }}
          />
          <h3 className="mt-3">Login</h3>
          {statusText && (
            <div className="alert alert-danger mt-3">{statusText}</div> // Display status message
          )}
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
