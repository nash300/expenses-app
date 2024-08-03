import payeeIcon from "../utilities/icons/payee.jpg";
import { useState } from "react";
import supabase from "../supabase";

const Payments = ({ userData, year, month }) => {
  // State management for form visibility and input data
  const [isAddNewPayeeClicked, setIsAddNewPayeeClicked] = useState(false);
  const [payeeName, setPayeeName] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("");
  const [isRepeatingPayment, setIsRepeatingPayment] = useState(false);
  const [intrestRate, setIntrestRate] = useState(0);

  const handleAddNewPayeeButtonClick = () => {
    setIsAddNewPayeeClicked(true);
  };

  const handlePayeeNameChange = (e) => {
    setPayeeName(e.target.value);
  };

  const handlePaymentCategoryChange = (e) => {
    setPaymentCategory(e.target.value);
  };

  const handleIsRepeatingPaymentChange = (e) => {
    setIsRepeatingPayment(e.target.checked);
  };

  const handleIntrestRateChange = (e) => {
    setIntrestRate(e.target.value);
  };

  const handleCloseClick = () => {
    setIsAddNewPayeeClicked(false);
    setPaymentCategory("");
    setPayeeName("");
    setIsRepeatingPayment(false);
    setIntrestRate(0);
  };

  // Function to save data to Supabase
  const handleSaveClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (payeeName && paymentCategory) {
      try {
        // Insert the data into the Supabase table
        const { error } = await supabase.from("Payee").insert([
          {
            user_id: userData.user_id,
            payee_name: payeeName,
            category: paymentCategory,
            is_repeating: isRepeatingPayment,
            intrest_rate: parseFloat(intrestRate) || null, // Store null if no interest rate provided
          },
        ]);

        if (error) {
          console.error("Error saving payee:", error);
          alert("Failed to save payee.");
        } else {
          alert("Saved successfully!");
          // Reset form fields and hide the form
          handleCloseClick();
        }
      } catch (error) {
        console.error("Error saving payee:", error);
        alert("An error occurred while saving the payee.");
      }
    } else {
      alert("Please enter all required fields.");
    }
  };

  return (
    <div className="card d-flex justify-content-center ">
      {/* "Add a new payee" section */}
      <div className="card d-flex flex-row align-items-center justify-content-center m-1 p-2 bg-primary">
        <img
          className="card-img-top "
          src={payeeIcon}
          alt="Card image cap"
          style={{ height: "30px", width: "30px", marginRight: "10px" }}
        />
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleAddNewPayeeButtonClick}
        >
          + Add a new payee
        </button>
      </div>
      {/* Conditional rendering when clicking on "Add new payee" */}
      {isAddNewPayeeClicked ? (
        <form>
          <div className="form-row p-5 pt-2">
            {/* Payee name */}
            <div className="form-group mb-3">
              <label htmlFor="payeeName">Bank/Payee name</label>
              <input
                type="text"
                className="form-control"
                id="payeeName"
                value={payeeName}
                onChange={handlePayeeNameChange}
                required
              />
            </div>
            {/* Payment category */}
            <div className="form-group d-grid align-items-start col-md-3">
              <label htmlFor="payment-category">Payment Category</label>
              <select
                id="payment-category"
                value={paymentCategory}
                onChange={handlePaymentCategoryChange}
                className="mb-4 form-control"
                required
              >
                <option value="">Select Here</option>
                <option value="Loan">Loan</option>
                <option value="Credit-Card">Credit Card</option>
                <option value="Bill">Bill</option>
              </select>
              <div className="form-group">
                <div className="form-check">
                  {/* Check-box "repeat every month" */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    checked={isRepeatingPayment}
                    onChange={handleIsRepeatingPaymentChange}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Repeat every month
                  </label>
                </div>
              </div>

              {/* Conditional rendering to collect interest rate info */}
              {isRepeatingPayment &&
                (paymentCategory === "Loan" ||
                  paymentCategory === "Credit-Card") && (
                  <div className="alert alert-warning mt-2">
                    <div className="form-group mb-3">
                      <label htmlFor="intrestRate">Interest rate</label>
                      <input
                        type="number"
                        className="form-control"
                        id="intrestRate"
                        value={intrestRate}
                        onChange={handleIntrestRateChange}
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-end pb-3 pe-3">
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* TO DO - PayeeBox rendering */
        <div className="alert alert-primary">to do - display previously saved payments here</div>
      )}
    </div>
  );
};

export default Payments;
