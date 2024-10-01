import React from "react";
import budgetPlanIcon from "../utilities/icons/1 (94).png"; // Path to the budget plan icon
import statisticsIcon from "../utilities/icons/1 (93).png"; // Path to the statistics icon
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

function HomeMenuPage() {
  // useNavigate hook provides the navigate function to programmatically navigate
  const navigate = useNavigate();

  // Handler function to navigate to the Budget Calculator page
  const handleBudgetCalculatorClick = () => {
    console.log("Navigating to /select-date"); // Log for debugging
    navigate("/select-date"); // Programmatically navigate to /select-date.
  };

  // Handler function to navigate to the Statistics page
  const handleStatisticsClick = () => {
    console.log("Navigating to /statistics"); // Log for debugging
    navigate("/statistics"); // Programmatically navigate to /statistics
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          {/* Card - Budget Calculator */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-secondary">
              <img
                className="card-img-top mx-auto mt-3"
                src={budgetPlanIcon}
                alt="Budget Calculator Icon" // Updated alt text for clarity
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Budget Calculator</h5>
                <p className="card-text">Create a new budget plan</p>
                <a
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={handleBudgetCalculatorClick} // Attach handler for navigation
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>

          {/* Card - Statistics */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-success">
              <img
                className="card-img-top mx-auto mt-3"
                src={statisticsIcon}
                alt="Statistics Icon" // Updated alt text for clarity
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Statistics</h5>
                <p className="card-text">See and compare past payments</p>
                <a
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={handleStatisticsClick} // Attach handler for navigation
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>

          {/* Add more cards if needed */}
        </div>
      </div>
    </div>
  );
}

export default HomeMenuPage;
