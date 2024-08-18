import supabase from "../supabase";
import { useState } from "react";
import { useBudget } from "../context files/BudgetProvider";

const CreateNewPayment = ({ setIsCreateNewPaymentClicked }) => {
  const { userData, year, month, payeeList, fetchAllSavedPayments } =
    useBudget();

  // Local states for form inputs
  const [selectedPayee, setSelectedPayee] = useState("");
  const [amount, setAmount] = useState(""); // Initialized as empty string for consistency
  const [notes, setNotes] = useState("");

  // Handle change in notes input field
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Handle change in amount input field
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle closing the form
  const handleCloseClick = () => {
    setIsCreateNewPaymentClicked(false);
  };

  // Handle change in payee dropdown
  const handlePayeeChange = (event) => {
    setSelectedPayee(event.target.value);
  };

  // Handle saving the new payment
  const handleSaveClick = async () => {
    if (selectedPayee && amount) {
      // Check for required fields
      try {
        // Insert new payment record into Supabase
        const { data, error } = await supabase.from("Payments").insert([
          {
            user_id: userData.user_id,
            payee_id: selectedPayee,
            sum: parseFloat(amount), // Convert amount to float
            note: notes,
            is_paid: false,
            year: year,
            month: month,
          },
        ]);

        if (error) {
          throw error;
        }

        alert("Payment saved successfully!");
        // Reset the form fields
        setSelectedPayee("");
        setAmount(""); // Reset to empty string for consistency
        setNotes("");
        setIsCreateNewPaymentClicked(false); // Close the form
        fetchAllSavedPayments(); // Refresh the list of saved payments
      } catch (error) {
        console.error("Error saving payment:", error);
        alert("Failed to save payment. Please try again.");
      }
    } else {
      alert("Please select a payee and enter an amount."); // Alert if required fields are missing
    }
  };

  return (
    <form>
      <div className="form-row p-5 pt-2">
        {/* Payee Selection */}
        <div className="form-group col-5 mb-3">
          <label htmlFor="payeeName">Select Bank/Payee *</label>
          <select
            id="payeeName"
            value={selectedPayee}
            onChange={handlePayeeChange}
            className="mb-2 form-control"
            required
          >
            <option value="">Select Here</option>

            {/* Group for one-time payments */}
            {payeeList
              .filter((payee) => !payee.is_repeating)
              .map((payee) => (
                <option key={payee.payee_id} value={payee.payee_id}>
                  {payee.payee_name}
                </option>
              ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="form-group col-3 mb-3">
          <label htmlFor="amount">Amount *</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
            <span className="input-group-text">Kr</span>
          </div>
        </div>

        {/* Notes Input */}
        <div className="form-group col-5 mb-3">
          <label htmlFor="note">Special notes</label>
          <div className="input-group">
            <textarea
              className="form-control"
              id="note"
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
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

export default CreateNewPayment;
