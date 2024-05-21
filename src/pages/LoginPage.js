import "./pageStyles/loginPage.css";
import supabase from "../supabase";
import { useState } from "react";

function LoginPage({ handleLoginSuccess }) {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusText, setStatusText] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Query Supabase to fetch user information
    const { data, error } = await supabase
      .from("User")
      .select()
      .eq("user_name", user_name)
      .single();

    // Start analysing the received data
    if (error) {
      setStatusText("Invalid username");
      return;
    }
    if (!data) {
      setStatusText("User not found");
      return;
    }
    if (password !== data.password) {
      setStatusText("Check password");
      return;
    }
    handleLoginSuccess(data);
  };

  return (
    <div id="log-in-page">
      <div id="log-in-banner-section">
        <div id="log-in-status-message-text">{statusText}</div>
        <form id="log-in-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="Button">
            Login
          </button>
        </form>
      </div>
      <div id="log-in-background-section"></div>
    </div>
  );
}

export default LoginPage;
