import React, { useState } from "react";

const PaymentBox = ({ payeeName, paymentSum, amountLeftToPay }) => {
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

  // changes the input sum into its initial amount
  const handleResetClick = () => {
    setSum(paymentSum);
    setSliderValue(paymentSum);
  };

  return (
    <div
      className="row rounded-pill border p-2 mb-1 shadow-sm"
      style={{ height: "auto" }}
    >
      <section className="col-md-6 d-flex align-items-center">
        <input className="me-2" type="checkbox" id="isPaid" />
        <div className="fw-semibold">{payeeName}</div>
      </section>
      <section className="col-md-4 d-flex align-items-center">
        {amountLeftToPay ? (
          <div className="d-flex align-items-center flex-grow-1">
            <input
              className="fw-semibold border-0 me-2"
              type="number"
              value={sum}
              onChange={handleSumInputChange}
              style={{ width: "90px" }}
            />
            <p className="mb-0 me-2">Kr</p>
            <input
              type="range"
              className="form-range flex-grow-1"
              id="customRange1"
              min="0"
              max={amountLeftToPay}
              step={10}
              value={sliderValue}
              onChange={handleSumSliderChange}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center flex-grow-1">
            <div className="fw-semibold me-2">{sum} Kr</div>
          </div>
        )}
      </section>
      <section className="col-md-2 d-flex justify-content-end align-items-center">
        {amountLeftToPay ? (
          <>
            <button className="btn btn-secondary" onClick={handleResetClick}>
              Reset
            </button>
            <button className="btn btn-danger ms-1">Delete</button>

          </>
        ) : (
          <button className="btn btn-danger">Delete</button>
        )}
      </section>
    </div>
  );
};

export default PaymentBox;
