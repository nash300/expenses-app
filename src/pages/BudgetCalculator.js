import { useState } from "react";
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>;

const BudgetCalculator = ({ userData }) => {
  // tracks the + button click in "add income" section----------------
  const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);

  // tracks all incomes----------------------
  const [incomes, setIncomes] = useState([]);

  // Handles the + button in 'add income' section.
  const handleAddIncomeClick = () => {
    setIsAddIncomeClicked(true);
  }; //-------------------------------------------

  // Tracks income inputs from the user----------------
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }; //-------------------------------------------------

  // Creates new 'income' object in 'incomes' state by collecting data from 'description' & 'amount' states
  // resetting the + button click state as it exits.
  const handleSaveIncomeClick = () => {
    if (description && amount) {
      setIncomes((prevIncomes) => [
        ...prevIncomes,
        { description: description, amount: parseFloat(amount) },
      ]);
      setDescription("");
      setAmount("");
      setIsAddIncomeClicked(false);
    } else {
      alert("Please enter both description and amount correctly.");
    }
  }; //-------------------------------------------------------------------------------------------------------

  // Calculate the total income by summing all amounts--
  const totalIncome = incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0); //---------------------------------------------

  //___________________________________________________________
  // State for selected year and month
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Generate options for years from 2000 to the current year
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
  }; //______________________________________________
  return (
    <div className=".container-fluid  ">
      <div className="row">
        {/* MONTH & INCOME SECTION ----------------------------------------- */}
        {/* Select Month Card - (START) */}
        <div className="col-2 m-1  ">
          <div class="card text-white bg-warning mb-3">
            <div class="card-header">Select Month</div>
            <div class="card-body">
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
                  {/* Select Month Card - (END) */}
                </div>
              </p>
            </div>{" "}
          </div>
          {/* INCOME CARD SECTION */}
          <div className="card text-white bg-primary mb-3  ">
            <div className="  card-header d-flex justify-content-between  ">
              Income
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleAddIncomeClick}
              >
                +
              </button>
            </div>
            <div className="card-body">
              <p className="card-text ">Total income of this month:</p>
              <h2> {totalIncome} Kr</h2>
            </div>
            <div className="card-body">
              <p className="card-text ">
                {
                  <ul className="list-group">
                    {/* Updates the list of incomes each time the user enters a new record*/}
                    {incomes.map((income, index) => (
                      <li key={index} className="list-group-item text-dark">
                        {income.description}: {income.amount}Kr
                      </li>
                    ))}
                  </ul>
                }
              </p>
            </div>
            <div className="card-body">
              {/* conditionaly renders income input fields as the user clicks on + button*/}
              {isAddIncomeClicked && (
                <p className="card-text">
                  <input
                    className="form-control form-control-sm mb-2"
                    type="text"
                    placeholder="Description"
                    onChange={handleDescriptionChange}
                  />
                  <input
                    className="form-control form-control-sm mb-1"
                    type="number"
                    placeholder="Amount"
                    onChange={handleAmountChange}
                  />
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={handleSaveIncomeClick}
                  >
                    Save
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PAYEE COMPONENT DISPLAY SECTION------------------------------------ */}
        <div className="col-5">One of three columns</div>

        {/* STATISTICS SECTION------------------------------------------------- */}
        <div className="col-1">One of three columns</div>
      </div>
    </div>
  );
};
export default BudgetCalculator;
