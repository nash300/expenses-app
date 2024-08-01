/*************************************************************/
/* This component is the Card for selecting the month & date */
/*************************************************************/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DateMenu = () => {
  // Local state for selected year and month
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Generate options for years from 2024 to the current year
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2024; year <= currentYear; year++) {
    yearOptions.push(year);
  }

  // Month options
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

  // Handle year selection change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle month selection change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // initializing a navigater
  const navigate = useNavigate();

  // direct page navigations into "BudgetCalculater" page
  // validates and passes out the selected month/date as props.
  const handleSubmitButton = () => {
    if (selectedYear && selectedMonth) {
      navigate("/budget-Calculator", {
        state: { month: selectedMonth, year: selectedYear },
      });
    } else {
      alert("Please select a year and a month");
    }
  };

  return (
    <div class="container card text-white bg-primary mb-2">
      <div class=" card-header ">Select Month</div>
      <div class="card-body ">
        <p class="card-text">
          <div className="container">
            <div className="row">
              <div className="col">
                <label htmlFor="yearSelect">Year:</label>
                <select
                  id="yearSelect"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="form-select"
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="monthSelect">Month:</label>
                <select
                  id="monthSelect"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="form-select"
                >
                  <option value="">Select Month</option>
                  {monthOptions.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </p>
        {/* submit button */}
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleSubmitButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DateMenu;
