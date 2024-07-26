/*
PAYEE BOX COMPONENT
* Mounts each payee into the main budget calculator page
*/

import React from "react";
import "./payeeBox.css";

const PayeeBox = (props) => {
  // Props:
  // name: string - The name of the payee
  // sum: number - The amount owed to the payee
  // is_paid: boolean (checkbox) - Whether the bill has been paid
  // onCheck: function - Callback function to handle checkbox changes

  const handleCheckChange = (event) => {
    
    // Handles 'paid' checkbox click
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
          <label htmlFor="amount"></label>
          <input type="text" id="amount" name="amount" value={props.sum} />
          <div id="check-box-section">
            <input
              type="checkbox"
              id="paid-checkbox"
              name="paid"
              checked={props.is_paid}
              onChange={handleCheckChange} // Call handleCheckChange when checkbox changes
            />
            <label htmlFor="paid-checkbox">Paid 🏁</label>
          </div>
        </div>

        <div id="button-section">
          <button id="delete-button">❌</button>
        </div>
      </div>
    </div>
  );
};

export default PayeeBox;
