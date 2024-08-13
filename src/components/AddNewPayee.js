import { useState } from "react";
import supabase from "../supabase";
import { useBudget } from "../context files/BudgetProvider";

const AddNewPayee = ({ setIsAddNewPayeeClicked }) => {
  const { userData, fetchPayeeList } = useBudget();

  // Local states
  const [payeeName, setPayeeName] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("");
  const [isRepeatingPayment, setIsRepeatingPayment] = useState(false);
  const [intrestRate, setIntrestRate] = useState();
  const [amountLeftToPay, setAmountLeftToPay] = useState();
  const [initialAmount, setInitialAmount] = useState();
  const [ocrNumber, setOcrNumber] = useState();

  const handleOcrNumberChange = (e) => {
    setOcrNumber(e.target.value);
  };

  const handleAmountLeftToPayChange = (e) => {
    setAmountLeftToPay(e.target.value);
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

  const handleInitialAmountChange = (e) => {
    setInitialAmount(e.target.value);
  };

  const handleCloseClick = () => {
    setIsAddNewPayeeClicked(false);
    setPaymentCategory("");
    setPayeeName("");
    setIsRepeatingPayment(false);
    setIntrestRate(0);
    setInitialAmount(null);
  };

  // Function to save data to Supabase
  const handleSaveClick = async (e) => {
    e.preventDefault();

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
            amount_left_to_pay: amountLeftToPay,
            ocr_number: ocrNumber,
            initial_amount: initialAmount,
          },
        ]);

        if (error) {
          console.error("Error saving payee:", error);
          alert("Failed to save payee. Please try again");
        } else {
          alert("Saved successfully!");
          setIsAddNewPayeeClicked(false);
          fetchPayeeList();
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
    <form>
      <div className="form-row p-5 pt-2">
        {/* Payee name */}
        <div className="form-group mb-3">
          <label htmlFor="payeeName">Bank/Payee name *</label>
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
        <div className=" d-block align-items-start ">
          <label htmlFor="payment-category">Payment Category *</label>
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
            <div className="form-check mb-3">
              {/* Check-box "repeat every month" */}
              <input
                className="form-check-input mb-4"
                type="checkbox"
                id="gridCheck"
                checked={isRepeatingPayment}
                onChange={handleIsRepeatingPaymentChange}
              />
              <label className="form-check-label " htmlFor="gridCheck">
                Repeat every month
              </label>
            </div>
          </div>
        </div>
        {/* Conditional rendering to collect credit info */}
        {isRepeatingPayment &&
          (paymentCategory === "Loan" || paymentCategory === "Credit-Card") && (
            <section className=" container d-flex row col-5 m-auto">
              <div className=" row alert alert-info ">
                {/* Initial amount */}
                <label htmlFor="remainingAmount">Initial amount *</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="remainingAmount"
                    value={initialAmount}
                    onChange={handleInitialAmountChange}
                    required
                  />
                  <span className="input-group-text">Kr</span>
                </div>
              </div>
              <div className=" row alert alert-info ">
                {/* How much is left to pay? */}
                <label htmlFor="remainingAmount">
                  How much is left to pay? *
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="remainingAmount"
                    value={amountLeftToPay}
                    onChange={handleAmountLeftToPayChange}
                    required
                  />
                  <span className="input-group-text">Kr</span>
                </div>
              </div>

              <div className="row alert alert-warning ">
                {/* Interest rate  */}
                <label htmlFor="intrestRate">
                  <i>Annual intrest rate </i>
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="intrestRate"
                    value={intrestRate}
                    onChange={handleIntrestRateChange}
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="row alert alert-warning ">
                {/* OCR section */}
                <label htmlFor="ocrNumber">
                  <i>(OCR number)</i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ocrNumber"
                  value={ocrNumber}
                  onChange={handleOcrNumberChange}
                />
              </div>
            </section>
          )}
      </div>
      <section className="container">
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
      </section>
    </form>
  );
};

export default AddNewPayee;
