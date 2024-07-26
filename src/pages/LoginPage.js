import { useState } from "react";
import supabase from "../supabase";
import userImage from "../utilities/icons/login-icon.jpg";

function LoginPage({ handleLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusText, setStatusText] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Query Supabase to fetch user information
    const { data, error } = await supabase
      .from("User")
      .select()
      .eq("user_name", username)
      .single();

    // Analyzing the received data
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

    // If all checks pass, login is successful
    handleLoginSuccess(data);
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
        {/* Display status messages */}
        <div style={{ marginBottom: "10px", color: "red" }}>{statusText}</div>
        {/* Login form */}
        <form
          className="card py-5 p-5 h-100 justify-content-center align-items-center "
          onSubmit={handleLogin}
        >
          <img className="mb-1 " src={userImage} style={{ height: "50px", width:"150px" }} />

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
