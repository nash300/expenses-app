import React from "react";
import createIcon from "../utilities/icons/1 (77).png";
import editIcon from "../utilities/icons/1 (81).png";
import statisticsIcon from "../utilities/icons/1 (84).png";
import exitIcon from "../utilities/icons/1 (146).png";

function HomeMenuPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          {/* Card - "Create" */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src={createIcon}
                alt="Create Icon"
              />
              <div className="card-body">
                <h5 className="card-title">Create</h5>
                <p className="card-text">Create a new budget</p>
                <a href="#" className="btn btn-primary">
                Click Here 
                </a>
              </div>
            </div>
          </div>

          {/* Card - "Edit" */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img className="card-img-top" src={editIcon} alt="Edit Icon" />
              <div className="card-body">
                <h5 className="card-title">Edit</h5>
                <p className="card-text">Update an existing budget </p>
                <a href="#" className="btn btn-primary">
Click Here                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src={statisticsIcon}
                alt="Statistics Icon"
              />
              <div className="card-body">
                <h5 className="card-title">Statistics</h5>
                <p className="card-text">See and compare past payments</p>
                <a href="#" className="btn btn-primary">
                Click Here                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMenuPage;
