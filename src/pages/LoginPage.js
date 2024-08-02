import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import userImage from "../utilities/icons/login-icon.jpg";

function LoginPage({ handleLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusText, setStatusText] = useState("");

  const navigate = useNavigate();

  /* 
  -fetches data from the server, compare it with user input.
  -displays error msgs to the user if needed. 
  -sends user info to the parent (App()).
  -automaticaly navigate to the home page
  */
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

      // If all checks pass
      handleLoginSuccess(data); // sending loged-in user data back to parent
      navigate("/home"); // Redirect to home page

      // Error msg to the console
    } catch (error) {
      console.error("Login error:", error);
      setStatusText("An unexpected error occurred.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <div style={{ marginBottom: "10px", color: "red" }}>{statusText}</div>
        <form
          className="card py-5 p-5 h-100 justify-content-center align-items-center"
          onSubmit={handleLogin}
        >
          <img
            className="mb-1"
            src={userImage}
            style={{ height: "50px", width: "150px" }}
            alt="Login Icon"
          />
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
          <div className="mb-3">
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
