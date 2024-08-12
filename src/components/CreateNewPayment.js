import supabase from "../supabase";
import { useState, useEffect, useCallback } from "react";
import { useBudget } from "../context files/BudgetProvider";

const CreateNewPayment = ({ setIsCreateNewPaymentClicked }) => {
  const { userData, year, month, payeeList, fetchAllSavedPayments } =
    useBudget();

  // Local States to track the selected payee
  const [selectedPayee, setSelectedPayee] = useState("");
  const [amount, setAmount] = useState();
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCloseClick = () => {
    setIsCreateNewPaymentClicked(false);
  };

  const handlePayeeChange = (event) => {
    setSelectedPayee(event.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const { data, error } = await supabase.from("Payments").insert([
        {
          user_id: userData.user_id,
          payee_id: selectedPayee,
          sum: parseFloat(amount),
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
      // resetting the input states
      setSelectedPayee("");
      setAmount(0);
      setNotes("");
      setIsCreateNewPaymentClicked(false); // Close the form on successful save
      fetchAllSavedPayments(); // re-fetching saved payments after creating a new paymwnt
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment. Please try again.");
    }
  };

  return (
    <form>
      <div className="form-row p-5 pt-2">
        <div className="form-group col-5 mb-3">
          <label htmlFor="payeeName">Select payee *</label>
          <select
            id="payeeName"
            value={selectedPayee}
            onChange={handlePayeeChange}
            className="mb-2 form-control"
            required
          >
            <option value="">Select Here</option>

            {/* Group for one-time payments */}
            <optgroup label="One-Time Payments">
              {payeeList
                .filter((payee) => !payee.is_repeating)
                .map((payee) => (
                  <option key={payee.payee_id} value={payee.payee_id}>
                    {payee.payee_name}
                  </option>
                ))}
            </optgroup>

            {/* Group for repeating payments */}
            <optgroup label="Repeating Payments">
              {payeeList
                .filter((payee) => payee.is_repeating)
                .map((payee) => (
                  <option key={payee.payee_id} value={payee.payee_id}>
                    {payee.payee_name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

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
        <div className="form-group col-5 mb-3">
          <label htmlFor="note">Special notes</label>
          <div className="input-group">
            <textarea
              type="textbox"
              className="form-control"
              id="note"
              value={notes}
              onChange={handleNotesChange}
              required
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
