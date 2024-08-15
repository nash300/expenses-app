import React, { useState, useEffect } from "react";
import supabase from "../supabase";
import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const PaymentBox = ({
  paymentId,
  isPaid,
  payeeName,
  paymentSum,
  amountLeftToPay,
  deletePayment,
  initialAmount,
  fetchAllSavedPayments,
  payeeId,
  category,
}) => {
  const { updateIsHover, updatePayeeId } = useBudget();

  // Local states to manage slider and checkbox
  const [sliderValue, setSliderValue] = useState(paymentSum); // Value to be sent to the server
  const [localSliderValue, setLocalSliderValue] = useState(paymentSum); // For the input field display
  const [isChecked, setIsChecked] = useState(isPaid); // Checkbox state for "is_paid"
  const [loading, setLoading] = useState(false); // Loading state to prevent user interactions during updates

  // Handle changes in the numeric input field
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    setLocalSliderValue(newValue);
    setSliderValue(newValue); // Immediate update to reflect in state
  };

  // Handle changes in the slider
  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    setLocalSliderValue(newValue);
  };

  // Handle payment deletion
  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await deletePayment(paymentId);
      console.log(`Payment ${paymentId} deleted successfully.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change (paid status)
  const handleIsPaidCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  // Update the payment record in the database
  const updatePaymentInDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Payments")
        .update({ sum: sliderValue, is_paid: isChecked })
        .eq("payment_id", paymentId)
        .select();
      if (error) {
        throw error;
      }
      console.log("Payment updated in the database:", data);
      fetchAllSavedPayments(); // Refetch updated payments
    } catch (error) {
      console.log("Error updating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update sliderValue in state and database when slider action completes
  const handleSliderMouseUp = () => {
    setSliderValue(localSliderValue); // Update server value
  };

  // Trigger database update when isChecked or sliderValue changes
  useEffect(() => {
    updatePaymentInDatabase();
  }, [isChecked, sliderValue]);

  const handleMouseEnter = () => {
    updateIsHover(true);
    updatePayeeId(payeeId);
  };

  const handleMouseLeave = () => {
    updateIsHover(false);
  };

  return (
    <div
      className={`content d-flex col rounded-end border ps-2 shadow-sm ${
        loading ? "opacity-90" : ""
      } ${isChecked ? " bg-warning-subtle opacity-10 " : ""}`}
      style={{ height: "70px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Payee Name and Paid Checkbox */}
      <section className="container col d-flex align-items-center">
        <input
          className="me-3 row"
          type="checkbox"
          id="isPaid"
          checked={isChecked}
          onChange={handleIsPaidCheck}
          disabled={loading} // Disable while loading
        />
        <div className="fw-semibold row">{payeeName}</div>
      </section>
  
      {/* Payment Slider and Amount Display */}
      <section className="container col-md-7 d-flex align-items-center">
        {initialAmount ? (
          <div className="container align-items-center">
            <div className="container d-flex align-items-center">
              <div className="me-1 align-items-center">Kr</div>
              <input
                className="form-control fw-semibold text-center align-items-center mb-1 p-0"
                type="number"
                value={localSliderValue}
                onChange={handleInputChange}
                onBlur={handleSliderMouseUp} // Update on blur
                style={{ width: "100px" }}
                disabled={loading || isChecked} // Disable while loading or checked
              />
            </div>
            <div>
              <input
                type="range"
                className="form-range"
                min={0}
                max={amountLeftToPay}
                step={1}
                value={localSliderValue}
                onChange={handleSliderChange}
                onMouseUp={handleSliderMouseUp} // Update on mouse release
                onTouchEnd={handleSliderMouseUp} // Handle touch end for mobile
                disabled={loading || isChecked} // Disable while loading or checked
              />
            </div>
          </div>
        ) : (
          <div className="container d-flex align-items-center">
            <div className="ms-2 p-2 align-items-center">Kr</div>
            <div className="fw-semibold">{paymentSum}</div>
          </div>
        )}
      </section>
  
      {/* Delete Button */}
      <section className="container col-md-3 d-flex justify-content-end align-items-center">
        <button
          className="btn btn-outline-danger"
          onClick={handleDeleteClick}
          disabled={loading || isChecked} // Disable while loading or checked
        >
          {loading ? "Processing..." : "Delete"}
        </button>
      </section>
    </div>
  );
  
};

export default PaymentBox;
