/* Functional component for navigation*/

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({userData}) => {

  const navigate = useNavigate();

  /* brings user to the "Home" screen as clicking 
  on the logo in navigation bar.*/
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <p className="navbar-brand m-2" href="#">
        {userData.first_name}
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
