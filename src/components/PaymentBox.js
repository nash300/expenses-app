import React, { useState, useEffect } from "react";
import supabase from "../supabase";

const PaymentBox = ({
  paymentId,
  isPaid,
  payeeName,
  paymentSum,
  amountLeftToPay,
  deletePayment,
  initialAmount,
  fetchAllSavedPayments,
}) => {
  const [sliderValue, setSliderValue] = useState(paymentSum); // This will be sent to the server
  const [localSliderValue, setLocalSliderValue] = useState(paymentSum); // This is for the input field only
  const [isChecked, setIsChecked] = useState(isPaid);
  const [loading, setLoading] = useState(false); // Loading state to freeze the form

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    setLocalSliderValue(newValue);
    setSliderValue(newValue); // Update sliderValue immediately to reflect the change in state
  };

  // Handle slider change
  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    setLocalSliderValue(newValue);
  };

  // Handle delete payment
  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await deletePayment(paymentId);
    } finally {
      setLoading(false);
    }
  };

  // Handle is_paid checkbox click
  const handleIsPaidCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  // Update sum and is_paid in the database
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
      console.log("Payment updated in the database", data);
      fetchAllSavedPayments();
    } catch (error) {
      console.log("Error updating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update sum in state and database when slider is released
  const handleSliderMouseUp = () => {
    setSliderValue(localSliderValue); // Set the value to be sent to the server
  };

  // Update is_paid in the database when checkbox changes or sliderValue changes
  useEffect(() => {
    updatePaymentInDatabase();
  }, [isChecked, sliderValue]);

  return (
    <div
      className={`container row rounded-pill border p-1 mb-2 shadow-sm ${
        loading ? "opacity-90" : ""
      } ${isChecked ? "alert alert-dark opacity-50 " : ""}`}
    >
      {/* Payee Name + Paid checkbox */}
      <section className="container col-md-2 d-flex align-items-center">
        <input
          className="me-3 "
          type="checkbox"
          id="isPaid"
          checked={isChecked}
          onChange={handleIsPaidCheck}
          disabled={loading} // Disable checkbox while loading
        />
        <div className="fw-semibold">{payeeName}</div>
      </section>

      {/* Payment Slider and Amount */}
      <section className="container col-md-7 d-flex align-items-center">
        {amountLeftToPay && initialAmount ? (
          <div className="container align-items-center">
            <div className="container d-flex align-items-center">
              <div className="me-1 align-items-center">Kr</div>
              <input
                className="form-control fw-semibold text-center align-items-center mb-1 p-0"
                type="number"
                value={localSliderValue}
                onChange={handleInputChange}
                onBlur={handleSliderMouseUp} // Update server when user leaves input field
                style={{ width: "100px" }}
                disabled={loading || isChecked} // Disable input while loading
              />
            </div>
            <div>
              <input
                type="range"
                className="form-range"
                min={0}
                max={amountLeftToPay}
                step={amountLeftToPay/100}
                value={localSliderValue}
                onChange={handleSliderChange}
                onMouseUp={handleSliderMouseUp} // Trigger update on mouse release
                onTouchEnd={handleSliderMouseUp} // Handle touch events for mobile
                disabled={loading || isChecked} // Disable slider while loading
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

      {/* Buttons */}
      <section className="container col-md-3 d-flex justify-content-end align-items-center">
        <button
          className="btn btn-outline-danger"
          onClick={handleDeleteClick}
          disabled={loading || isChecked} // Disable button while loading
        >
          {loading ? "Processing..." : "Delete"}
        </button>
      </section>
    </div>
  );
};

export default PaymentBox;
