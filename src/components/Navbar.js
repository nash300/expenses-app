/* Functional component for navigation*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ userData }) => {
  const navigate = useNavigate();

  /* brings user to the "Home" screen as clicking 
  on the logo in navigation bar.*/
  const handleHomeClick = () => {
    navigate("/home");
  };

    // Stores "month" from the child component.
    const [selectedMonth, setSelectedMonth] = useState("");

    // Stores "year" from the child component.
    const [selectedYear, setSelectedYear] = useState("");
  
    // fetches the year & month that the user chooses from the child component (DateMenu).
    const fetchDateFromChild = (year, month) => {
      setSelectedYear(year);
      setSelectedMonth(month);
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      {/* displaying the user's name */}
      <p className="navbar-brand m-2" href="#">
        User : {userData.first_name}
      </p>

     
      <div
        className="collapse navbar-collapse justify-content-end pe-5 "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto  ">
          <li className="nav-item active">
            <a className="nav-link btn  " href="#" onClick={handleHomeClick}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Profile
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              About us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
