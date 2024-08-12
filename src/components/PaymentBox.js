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
  const [sum, setSum] = useState(paymentSum);
  const [sliderValue, setSliderValue] = useState(paymentSum);
  const [isChecked, setIsChecked] = useState(isPaid);
  const [loading, setLoading] = useState(false);

  // Handle slider change (only updates state)
  const handleSumSliderChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
  };

  // Handle input change
  const handleSumInputChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    setSum(newValue);
  };

  // Reset sum to initial value
  const handleResetClick = () => {
    setSum(paymentSum);
    setSliderValue(paymentSum);
  };

  // Handle delete payment
  const handleDeleteClick = () => {
    deletePayment(paymentId);
  };

  // handle is_paid checkbox click
  const handleIsPaidCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  //  Update sum and is_paid in the database
  const updatePaymentInDatabase = async (updatedSum, updatedIsChecked) => {
    try {
      setLoading(true); // Disable interactions while saving
      const { data, error } = await supabase
        .from("Payments")
        .update({ sum: updatedSum, is_paid: updatedIsChecked })
        .eq("payment_id", paymentId)
        .select();
      if (error) {
        throw error;
      }
      console.log("Payment updated in the database", data);
      // No need to reset state here, as updates have already been made
    } catch (error) {
      console.log("Error updating payment:", error);
      // Consider adding user feedback here, such as a toast or message
    } finally {
      setLoading(false); // Re-enable interactions
    }
  };

  // Update sum in state and database when slider is released
  const handleSliderMouseUp = () => {
    setSum(sliderValue);
    updatePaymentInDatabase(sliderValue, isChecked);
    fetchAllSavedPayments();
  };

  // Update is_paid in the database when checkbox changes
  useEffect(() => {
    if (!loading) {
      updatePaymentInDatabase(sum, isChecked);
      fetchAllSavedPayments();
    }
  }, [isChecked]);

  return (
    <div className="container row rounded-pill border p-1 mb-2 shadow-sm">
      {/* Payee Name + Paid checkbox */}
      <section className="container col-md-2 d-flex align-items-center">
        <input
          className="me-2"
          type="checkbox"
          id="isPaid"
          checked={isChecked}
          onChange={handleIsPaidCheck}
          disabled={loading} // Disable interaction during loading
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
                value={sliderValue}
                onChange={handleSumInputChange}
                style={{
                  width: "100px",
                }}
                disabled={loading} // Disable interaction during loading
              />
            </div>

            <input
              type="range"
              className="form-range"
              min="0"
              max={amountLeftToPay}
              step={1}
              value={sliderValue}
              onChange={handleSumSliderChange}
              onMouseUp={handleSliderMouseUp} // Trigger update on mouse release
              onTouchEnd={handleSliderMouseUp} // Handle touch events for mobile
              disabled={loading} // Disable interaction during loading
            />
          </div>
        ) : (
          <div className="container d-flex align-items-center">
            {/* Other bills */}
            <div className="ms-2 align-items-center">Kr</div>
            <div className="fw-semibold ms-5">{sum}</div>
          </div>
        )}
      </section>

      {/* Buttons */}
      <section className="container col-md-3 d-flex justify-content-end align-items-center">
        {amountLeftToPay && initialAmount ? (
          <>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleResetClick}
              disabled={loading} // Disable interaction during loading
            >
              Reset
            </button>
            <button
              className="btn btn-danger ms-1 btn-sm"
              onClick={handleDeleteClick}
              disabled={loading} // Disable interaction during loading
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDeleteClick}
            disabled={loading} // Disable interaction during loading
          >
            Delete
          </button>
        )}
      </section>
    </div>
  );
};

export default PaymentBox;
