import React from "react";
import budgetPlanIcon from "../utilities/icons/1 (94).png";
import statisticsIcon from "../utilities/icons/1 (93).png";
import { useNavigate } from "react-router-dom";

function HomeMenuPage() {
  // useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Handler function for navigation menu item
  const handleBudgetCalculatorClick = () => {
    navigate("/select-date");
  };

  // Handler function for navigation menu item
  const handleStatisticsClick = () => {
    navigate("/statistics");
  };
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          {/* Card - Budget calculator */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-secondary">
              <img
                className="card-img-top mx-auto mt-3"
                src={budgetPlanIcon}
                alt="Edit Icon"
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Budget Calculator</h5>
                <p className="card-text">Create a new budget plan</p>
                <a
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={handleBudgetCalculatorClick}
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>

          {/* Card - statistics */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-success">
              <img
                className="card-img-top mx-auto mt-3"
                src={statisticsIcon}
                alt="Statistics Icon"
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Statistics</h5>
                <p className="card-text">See and compare past payments</p>
                <a
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={handleStatisticsClick}
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
