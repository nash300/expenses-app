import payeeIcon from "../utilities/icons/payee.jpg";
import { useState } from "react";

const PayeeBox = ({ userData, year, month }) => {
  // Tracks "Add a new payee" button click state
  const [isAddNewPayeeClicked, setIsAddNewPayeeClicked] = useState(false);

  const [payeeName, setPayeeName] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("");
  const [isRepeatingPayment, setIsRepeatingPayment] = useState(false);
  const [intrestRate, setIntrestRate] = useState(0);

  const handleAddNewPayeeButtonClick = () => {
    setIsAddNewPayeeClicked(true);
  };

  const handlePayeeNameChange = (e) => {
    setPayeeName(e.target.value);
  };

  const handlePaymentCategoryChange = (e) => {
    setPaymentCategory(e.target.value);
  };

  const handleIsRepeatingPaymentChange = (e) => {
    setIsRepeatingPayment(e.target.checked);
  };

  const handleIntrestRateChange = (e) => {
    setIntrestRate(e.target.value);
  };

  const handleCloseClick = () => {
    setIsAddNewPayeeClicked(false);
    setPaymentCategory("");
    setPayeeName("");
    setIsRepeatingPayment(false);
    setIntrestRate(0);
  };

  return (
    <div className="card d-flex justify-content-center ">
      {/* "Add a new payee" section */}
      <div className="card d-flex flex-row align-items-center justify-content-center m-1 p-2 bg-primary">
        <img
          className="card-img-top "
          src={payeeIcon}
          alt="Card image cap"
          style={{ height: "30px", width: "30px", marginRight: "10px" }}
        />
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleAddNewPayeeButtonClick}
        >
          + Add a new payee
        </button>
      </div>

      {isAddNewPayeeClicked ? (
        /* CODE DISPLAYING FORM HERE */
        <form>
          <div className="form-row p-5 pt-2">
            <div className="form-group mb-3">
              <label htmlFor="payeeName">Bank/Payee name</label>
              <input
                type="text"
                className="form-control"
                id="payeeName"
                value={payeeName}
                onChange={handlePayeeNameChange}
                required
              />
            </div>
            <div className="form-group d-grid align-items-start col-md-3  ">
              <label htmlFor="payment-category">Payment Category</label>
              <select
                id="payment-category"
                value={paymentCategory}
                onChange={handlePaymentCategoryChange}
                className="mb-4 form-control "
                required
              >
                <option value="">Select Here</option>
                <option value="Loan">Loan</option>
                <option value="Credit-Card">Credit Card</option>
                <option value="Bill">Bill</option>
              </select>
              <div className="form-group ">
                <div className="form-check">
                  {/* Changed `checked` binding to use state variable */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    checked={isRepeatingPayment}
                    onChange={handleIsRepeatingPaymentChange}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Repeat every month
                  </label>
                </div>
              </div>

              {/* Conditional rendering an additional div to collect intrest rate info  */}
              {isRepeatingPayment &&
                (paymentCategory === "Loan" ||
                  paymentCategory === "Credit-Card") && (
                  <div className="alert alert-warning mt-2">
                    <div className="form-group mb-3">
                      <label htmlFor="intrestRate">Intrest rate</label>
                      <input
                        type="number"
                        className="form-control"
                        id="intrestRate"
                        value={intrestRate}
                        onChange={handleIntrestRateChange}
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-end pb-3 pe-3">
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* CODE PAYEEBOX RENDERING HERE */
        <div className="alert alert-primary">Payee box</div>
      )}
    </div>
  );
};

export default PayeeBox;
