import payeeIcon from "../utilities/icons/1 (126).png";
import newPayeeIcon from "../utilities/icons/1 (92).png";
import { useState } from "react";
import AddNewPayee from "../components/AddNewPayee";
import CreateNewPayment from "../components/CreateNewPayment";

const AddAndCreateSection = ({ isEmpty }) => {
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
    <div className="card d-flex justify-content-center shadow mt-2 fixed">
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
            Save a payment reciever
          </button>
        </div>
        <div>
          {/* Conditional rendering "Create New Payment" button only if there exist a created budget plan for the month */}
          {!isEmpty ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Conditional rendering on "ADD NEW PAYEE" click */}
      {isAddNewPayeeClicked && (
        <AddNewPayee setIsAddNewPayeeClicked={setIsAddNewPayeeClicked} />
      )}

      {/* Conditional rendering on "CREATE NEW PAYMENT" click */}
      {isCreateNewPaymentClicked && (
        <CreateNewPayment
          setIsCreateNewPaymentClicked={setIsCreateNewPaymentClicked}
        />
      )}
    </div>
  );
};

export default AddAndCreateSection;
