import React, { useState } from "react";

const PaymentBox = ({
  key,
  paymentId,
  isPaid,
  payeeName,
  paymentSum,
  amountLeftToPay,
  deletePayment,
  initialAmount,
}) => {
  const [sum, setSum] = useState(paymentSum);
  const [sliderValue, setSliderValue] = useState(paymentSum);

  // Handle slider change
  const handleSumSliderChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    setSum(newValue);
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

  return (
    <div className="container row rounded-pill border p-1 mb-2 shadow-sm">
      {/* Payee Name + Paid checkbox */}
      <section className="container col-md-2 d-flex align-items-center">
        <input className="me-2" type="checkbox" id="isPaid" />
        <div className="fw-semibold">{payeeName}</div>
      </section>

      {/* Payment Slider and Amount */}
      <section className="container col-md-7 d-flex align-items-center">
        {amountLeftToPay && initialAmount ? (
          <div className=" container align-items-center">
            <div className=" container d-flex align-items-center">
              <div className="me-1 align-items-center">Kr</div>
              <input
                className="form-control  fw-semibold text-center align-items-center  mb-1 p-0"
                type="number"
                value={sum}
                onChange={handleSumInputChange}
                style={{
                  width: "100px",
                }}
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
            >
              Reset
            </button>
            <button
              className="btn btn-danger ms-1 btn-sm"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </>
        ) : (
          <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
            Delete
          </button>
        )}
      </section>
    </div>
  );
};

export default PaymentBox;
