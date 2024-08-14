/* Functional component for navigation*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context files/BudgetProvider";
import userIcon from "../utilities/icons/user.jpg"

const Navbar = () => {
  const { userData, setIsLoggedIn, setYear, setMonth, fetchAllSavedPayments } =
    useBudget();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Reseting saved date & year
    // Navigating to Home page
    setYear("");
    setMonth("");
    navigate("/home");
    fetchAllSavedPayments();
  };

  const handleLogout = () => {
    // Reset states upon logout
    setIsLoggedIn(false);
    setYear("");
    setMonth("");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0  fixed-top" style={{maxHeight: "5vh"}}>
      <div className=" d-flex navbar-brand m-2 p-0" href="#">
        <img src={userIcon} className="rounded-circle" style={{height: "40px" , width: "40px"}}/>
        <p className=" align-items-center justify-content-center ps-2 m-0">{userData.first_name}</p>

      </div>

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
