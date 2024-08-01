/* This is the page that the user can select the month/date for the budget calculation */

import DateMenu from "../components/DateMenu";
import calenderImg from "../utilities/icons/calendar.png";
import { useState } from "react";

const SelectDatePage = () => {
  // Stores "month" from the child component.
  const [selectedMonth, setSelectedMonth] = useState("");

  // Stores "year" from the child component.
  const [selectedYear, setSelectedYear] = useState("");

  const submitClickHandler = () => {};

  return (
    <div className="container col-8 d-flex justify-content-center align-items-center min-vh-100 ">
      {/* Wrap the image in a flexbox container to align it vertically */}
      <div className=" align-items-center justify-content-center ">
        <img src={calenderImg} alt="Calendar" style={{ width: 100 }} />
      </div>
      <div className="d-flex flex-column align-items-start">
        <DateMenu />
        <div className="d-flex justify-content-end w-100 mt-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={submitClickHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDatePage;
