/* Functional component for navigation*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context files/BudgetProvider";

const Navbar = () => {
  const { userData, setIsLoggedIn, setYear, setMonth } = useBudget();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Reseting saved date & year
    // Navigating to Home page
    setYear("");
    setMonth("");
    navigate("/home");
  };

  const handleLogout = () => {
    // Reset states upon logout
    setIsLoggedIn(false);
    setYear("");
    setMonth("");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <p className="navbar-brand m-2" href="#">
        User : {userData.first_name}
      </p>

      <div
        className="collapse navbar-collapse justify-content-end pe-5 "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto  ">
          <li className="nav-item active">
            <a className="nav-link btn" href="#" onClick={handleHomeClick}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Profile
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
