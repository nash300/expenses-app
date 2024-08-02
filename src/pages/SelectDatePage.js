import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calenderImg from "../utilities/icons/calendar.png";

const SelectDatePage = () => {
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

  // Initializing a navigator
  // When both year and month are selected, it navigates to "/budget-Calculator" passing
  // the chosen date & month as an object.
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      navigate("/budget-Calculator", {
        state: { month: selectedMonth, year: selectedYear },
      });
    }
  }, [selectedYear, selectedMonth, navigate]); // Include navigate in dependencies

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="  align-items-center justify-content-center">
        <img src={calenderImg} alt="Calendar" style={{ width: 150 }} />
      </div>
      <div className="d-grid align-items-start">
        {/* Year Selection Dropdown */}
        <label htmlFor="year" ></label>
        <select id="year" value={selectedYear} onChange={handleYearChange} className="mb-2">
          <option value="">Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Month Selection Dropdown */}
        <label htmlFor="month"></label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          {monthOptions.map((month, index) => (
            // Set the value to index + 1 to make it 1-based (1 for January, 2 for February, etc.)
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

      
      </div>
    </div>
  );
};

export default SelectDatePage;
