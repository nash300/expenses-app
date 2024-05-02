import React from "react";
import "./componentStyles/payeeBox.css";

const PayeeBox = () => {
  return (
    <div id="payee-box">
      <div id="left-section">
        <div id="icon"></div>
        <div id="payee-name">Nordea</div>
      </div>
      <div id="right-section">
        <div id="amount-section">
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" name="amount" />
          <div id="check-box-section">
            <input type="checkbox" id="paid-checkbox" name="paid" />
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
