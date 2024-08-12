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

  // Effect for navigation
  useEffect(() => {
    if (year && month) {
      navigate("/budget-Calculator");
    }
  }, [year, month, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="align-items-center justify-content-center">
        <img src={calenderImg} alt="Calendar" style={{ width: 150 }} />
      </div>
      <div className="d-grid align-items-start">
        <label htmlFor="year"></label>
        <select
          id="year"
          value={year || ""}
          onChange={handleYearChange}
          className="mb-2"
        >
          <option value="">Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="month"></label>
        <select id="month" value={month || ""} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          {monthOptions.map((month, index) => (
            <option key={index} value={index + 1}>
              {index + 1} - {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDatePage;
