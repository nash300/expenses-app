import React from "react";
import budgetTemplateIcon from "../utilities/icons/1 (127).png";
import budgetPlanIcon from "../utilities/icons/1 (117).png";
import statisticsIcon from "../utilities/icons/1 (93).png";
import { useNavigate } from "react-router-dom";


function HomeMenuPage() {
// useNavigate hook to get the navigate function
  const navigate = useNavigate();



  const handleBudgetTemplateClick = () => {
    /* Handles "Budget template click*/
    /* Mounts BudgetTemplate component and sends out the "currentUser object as prop" */
    navigate("/budget-template");

  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          {/* Card 1 */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-primary">
              <img
                className="card-img-top mx-auto mt-3"
                src={budgetTemplateIcon}
                alt="Create Icon"
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Budget Template</h5>
                <p className="card-text">
                  Create customized budget template to use in your budget
                  planning
                </p>
                <a
                  href="#"
                  className="btn btn-primary mt-auto"
                  onClick={handleBudgetTemplateClick}
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column alert alert-secondary">
              <img
                className="card-img-top mx-auto mt-3"
                src={budgetPlanIcon}
                alt="Edit Icon"
                style={{ width: 100 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Calculate Budget</h5>
                <p className="card-text">Create a new budget plan</p>
                <a href="#" className="btn btn-primary mt-auto">
                  Click Here
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
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
                <a href="#" className="btn btn-primary mt-auto">
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
