/*********************************************************************/
/* The page for displaying and calculating the incomes and expenses. */
/*********************************************************************/
// IMPORTANT VARIABLES
// totalIncome - (THE TOTAL INCOME RETRIEVED FROM THE CHILD COMPONENT)
// userData - (THE BASIC DATA OF THE CURRENT LOGGED IN USER (i.g: user_id, first_name))
// month - (SELECTED MONTH BY THE USER)
// year - (SELECTED YEAR BY THE USER)

import { useState } from "react";
import IncomeAdder from "../components/IncomeAdder";
import { useLocation } from "react-router-dom";
import NewPayee from "../components/NewPayee";
import SavedPaymentsSection from "../components/SavedPaymentsSection";

const BudgetCalculator = ({ userData }) => {
  const location = useLocation();

  // Access the data from location.state
  const { month, year } = location.state || {};

  // Stores the total income sent by the child component (IncomeAdder)
  const [totalIncome, setTotalIncome] = useState(null);
  const retrieveIncomeFromChild = (income) => {
    setTotalIncome(income);
  };

  return (
    <div className="container-fluid">
      {/* info section */}
      <div className="bg-info text-dark text-center justify-content-end rounded-bottom mb-2 p-2">
        <h6 className="pe-4">
          Your budget for the {month} month of year {year}
        </h6>
      </div>

      {/* LEFT - income adder component */}
      <div className="row justify-content-start">
        <div className="col-2 mb-2">
          <IncomeAdder
            userData={userData}
            year={year}
            month={month}
            retrieveIncomeFromChild={retrieveIncomeFromChild}
          />
        </div>

        {/* MIDDLE - "New payee" + "Payments" */}
        <div className="col-6 mb-2">
          <NewPayee userData={userData} year={year} month={month} />
          <SavedPaymentsSection userData={userData} year={year} month={month} />

        </div>

        {/* RIGHT- Statistics section */}
        <div className="col-4">
          to-do. show statics here
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
