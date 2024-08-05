import supabase from "../supabase";
import { useState, useEffect } from "react";
import { useBudget } from "../context files/BudgetProvider";

const CreateNewPayment = ({ setIsCreateNewPaymentClicked }) => {
  const { userData, year, month, payeeList, setPayeeList } = useBudget();

  // Local States to track the selected payee
  const [selectedPayee, setSelectedPayee] = useState("");
  const [amount, setAmount] = useState(0);
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

      alert("Payment saved successfully!");
      setSelectedPayee("");
      setAmount(0);
      setNotes("");
      setIsCreateNewPaymentClicked(false); // Close the form on successful save
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment. Please try again.");
    }
  };

  const handlePayeeChange = (event) => {
    setSelectedPayee(event.target.value);
  };

  // fetches a list of all saved payees as the component mounts.
  useEffect(() => {
    const fetchPayeeList = async () => {
      try {
        const { data, error } = await supabase
          .from("Payee")
          .select("*")
          .eq("user_id", userData.user_id);
        if (error) {
          throw error;
        }
        setPayeeList(data);
        console.log("Payee-list recieved :", data);
      } catch (error) {
        alert("Something went wrong");
        console.log("Error fetching payee-list", error);
      }
    };

    fetchPayeeList();
  }, [userData.user_id]);

  return (
    <form>
      <div className="form-row p-5 pt-2">
        <div className="form-group col-5 mb-3">
          <label htmlFor="payeeName">Select payee *</label>
          <select
            id="payeeName"
            value={selectedPayee}
            onChange={handlePayeeChange}
            className="mb-2  form-control"
            required
          >
            <option value="">Select Here</option>
            {/* Iterate over payeeList to create options */}
            {payeeList.map((payee) => (
              <option key={payee.payee_id} value={payee.payee_id}>
                {payee.payee_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-3 mb-3">
          <label htmlFor="amount">Amount * </label>
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
          <label htmlFor="note">Special notes </label>
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
