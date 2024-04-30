import "./pageStyles/loginPage.css";

function LoginPage() {
  return (
    <div id="log-in-page">
      <div id="log-in-banner" className="Msg-box">
        <h3>Enter your login details</h3>
        <form id="log-in-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="Button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
