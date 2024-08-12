import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import userImage from "../utilities/icons/login-icon.jpg";

function LoginPage({ handleLoginSuccess }) {
  // Local states to track user inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusText, setStatusText] = useState("");

  const navigate = useNavigate();

  // -fetches data from the server, compare it with user input.
  // -displays error msgs to the user if needed.
  // -sends user info to the parent (App()).
  // -automaticaly navigate to "/home".

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Query Supabase to fetch user information
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_name", username)
        .single();

      // Error msg to the user
      if (error) {
        setStatusText("Invalid username or error fetching user.");
        return;
      }
      if (!data) {
        setStatusText("User not found.");
        return;
      }
      if (password !== data.password) {
        setStatusText("Incorrect password.");
        return;
      }

      // If all checks pass...
      handleLoginSuccess(data); // sending loged-in user data back to context
      navigate("/home"); // Redirect to home page

      // Error msg to the console
    } catch (error) {
      console.error("Login error:", error);
      setStatusText("An unexpected error occurred.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light ">
      <div className="card container shadow-lg  p-5 border-0" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <img
            src={userImage}
            alt="Login Icon"
            style={{ height: "130px", width: "130px" }}
          />
          <h3 className="mt-3">Login</h3>
          {statusText && (
            <div className="alert alert-danger mt-3">{statusText}</div>
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
