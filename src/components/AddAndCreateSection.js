import payeeIcon from "../utilities/icons/1 (126).png";
import newPayeeIcon from "../utilities/icons/1 (92).png";
import { useState } from "react";
import AddNewPayee from "../components/AddNewPayee";
import CreateNewPayment from "../components/CreateNewPayment";

const AddAndCreateSection = ({ isNoPayments }) => {
  // Local state to manage which modal is displayed
  const [isAddNewPayeeClicked, setIsAddNewPayeeClicked] = useState(false);
  const [isCreateNewPaymentClicked, setIsCreateNewPaymentClicked] =
    useState(false);

  // Function to handle the Add New Payee button click
  const handleAddNewPayeeButtonClick = () => {
    setIsCreateNewPaymentClicked(false); // Close Create New Payment modal
    setIsAddNewPayeeClicked(true); // Open Add New Payee modal
  };

  // Function to handle the Create New Payment button click
  const handleCreateNewPaymentButtonClick = () => {
    setIsAddNewPayeeClicked(false); // Close Add New Payee modal
    setIsCreateNewPaymentClicked(true); // Open Create New Payment modal
  };

  return (
    <div
      className="card  d-flex justify-content-center shadow mb-3"
      style={{ position: "sticky", top: "15px" }}
    >
      <div className="card d-flex flex-row align-items-center justify-content-center m-1 p-2 bg-primary">
        {/* new payee side*/}

        <div className="col">
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleAddNewPayeeButtonClick}
          >
            <img
              className="card-img-top"
              src={payeeIcon}
              alt="Add new payee"
              style={{ height: "30px", width: "30px", marginRight: "10px" }}
            />
            Save Payment Receivers
          </button>
        </div>

        {/* Conditionally render the Create New Payment button only if there's a created budget plan for the month */}

        <div>
          {!isNoPayments && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleCreateNewPaymentButtonClick}
            >
              <img
                className="card-img-top"
                src={newPayeeIcon}
                alt="Create new payment"
                style={{ height: "30px", width: "30px", marginRight: "10px" }}
              />
              Create One-Time Payment
            </button>
          )}
        </div>
      </div>

      {/* Conditional rendering for modals */}
      {isAddNewPayeeClicked && (
        <AddNewPayee setIsAddNewPayeeClicked={setIsAddNewPayeeClicked} />
      )}
      {isCreateNewPaymentClicked && (
        <CreateNewPayment
          setIsCreateNewPaymentClicked={setIsCreateNewPaymentClicked}
        />
      )}
    </div>
  );
};

export default AddAndCreateSection;
