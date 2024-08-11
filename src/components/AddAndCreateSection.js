import payeeIcon from "../utilities/icons/1 (117).png";
import newPayeeIcon from "../utilities/icons/1 (92).png";
import { useState } from "react";
import AddNewPayee from "../components/AddNewPayee";
import CreateNewPayment from "../components/CreateNewPayment";
import { useBudget } from "../context files/BudgetProvider";

const AddAndCreateSection = () => {
  const { userData, fetchSavedPayments } = useBudget();

  // Tracks click status of the buttons
  const [isAddNewPayeeClicked, setIsAddNewPayeeClicked] = useState(false);
  const [isCreateNewPaymentClicked, setIsCreateNewPaymentClicked] =
    useState(false);

  // Ensure only one button gets activated at a time
  const handleAddNewPayeeButtonClick = () => {
    setIsCreateNewPaymentClicked(false);
    setIsAddNewPayeeClicked(true);
  };

  // Ensure only one button gets activated at a time
  const handleCreateNewPaymentButtonClick = () => {
    setIsAddNewPayeeClicked(false);
    setIsCreateNewPaymentClicked(true);
  };

  return (
    <div className="card d-flex justify-content-center shadow-sm ">
      <div className="card d-flex flex-row align-items-center justify-content-center m-1 p-2 bg-primary">
        <div className="col">
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleAddNewPayeeButtonClick}
          >
            <img
              className="card-img-top "
              src={payeeIcon}
              alt="Card image cap"
              style={{ height: "30px", width: "30px", marginRight: "10px" }}
            />
            Add a new payee
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleCreateNewPaymentButtonClick}
          >
            <img
              className="card-img-top "
              src={newPayeeIcon}
              alt="Card image cap"
              style={{ height: "30px", width: "30px", marginRight: "10px" }}
            />
            Create New Payment
          </button>
        </div>
      </div>

      {/* Conditional rendering on "ADD NEW PAYEE" click */}
      {isAddNewPayeeClicked && (
        <AddNewPayee
          userData={userData}
          setIsAddNewPayeeClicked={setIsAddNewPayeeClicked}
        />
      )}

      {/* Conditional rendering on "CREATE NEW PAYMENT" click */}
      {isCreateNewPaymentClicked && (
        <CreateNewPayment
          userData={userData}
          setIsCreateNewPaymentClicked={setIsCreateNewPaymentClicked}
          refreshPayments={fetchSavedPayments} // Pass the fetch function from context
        />
      )}
    </div>
  );
};

export default AddAndCreateSection;
