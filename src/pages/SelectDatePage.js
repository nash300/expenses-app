import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calenderImg from "../utilities/icons/calendar.png";
import { useBudget } from "../context files/BudgetProvider";

const SelectDatePage = () => {
  const { year, setYear, month, setMonth } = useBudget();

  // Generate options for years from 2024 to the current year
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2024; year <= currentYear; year++) {
    yearOptions.push(year);
  }

  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const navigate = useNavigate();

 

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light ">
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <img src={calenderImg} alt="Calendar" style={{ width: 100 }} />
          <h3 className="mt-3">Select Date</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            id="year"
            value={year || ""}
            onChange={handleYearChange}
            className="form-select"
          >
            <option value="" disabled>
              Select Year
            </option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="month" className="form-label">
            Month
          </label>
          <select
            id="month"
            value={month || ""}
            onChange={handleMonthChange}
            className="form-select"
          >
            <option value="" disabled>
              Select Month
            </option>
            {monthOptions.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-warning btn-sm "
            disabled={!year || !month}
            onClick={() => navigate("/budget-Calculator")}
          >
            Go to Budget Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDatePage;
