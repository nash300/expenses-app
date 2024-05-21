import React from "react";
import "./componentStyles/payeeBox.css";

const PayeeBox = (props) => {
  const handleCheckChange = (event) => {
    const checkedComponent = event.target.checked;
    // Call the onCheck function passed from the parent component
    props.onCheck(checkedComponent);
  };

  return (
    <div id="payee-box">
      <div id="left-section">
        <div id="icon"></div>
        <div id="payee-name">{props.name}</div>
      </div>
      <div id="right-section">
        <div id="amount-section">
          <label htmlFor="amount">Amount</label>
          <input type="text" id="amount" name="amount" value={props.sum} />
          <div id="check-box-section">
            <input
              type="checkbox"
              id="paid-checkbox"
              name="paid"
              checked={props.is_paid}
              onChange={handleCheckChange} // Call handleCheckChange when checkbox changes
            />
            <label htmlFor="paid">Paid</label>
          </div>
        </div>

        <div id="button-section">
          <button id="edit-button"></button>
          <button id="delete-button"></button>
        </div>
      </div>
    </div>
  );
};

export default PayeeBox;
