/*********************************************************************/
/* The page for displaying and calculating the incomes and expences. */
/*********************************************************************/
// IMPORTANT VARIABLES
// totalIncome - (THE TOTAL INCOME RETRIEVED FROM THE CHILD COMPONENT)
// userData - (THE BASIC DATA OF THE CURRENT LOGGED IN USER (i.g: user_id, first_name))
// month - (SELECTED MONTH NY THE USER)
// year - (SELECTED YEAR BY THE USER)

import { useState } from "react";
import IncomeAdder from "../components/IncomeAdder";
import { useLocation } from "react-router-dom";
import Payments from "../components/Payments";

const BudgetCalculator = ({ userData }) => {
  const location = useLocation();

  // Access the data from location.state
  const { month, year } = location.state || {};

  // Stores the total income sent by the child component (IncomeAdder)
  const [totalIncome, setTotalIncome] = useState(null);
  const retrievIncomeFromChild = (income) => {
    setTotalIncome(income);
  };

  return (
    <div className=".container-fluid">
      {/* info section */}
      <div className=" d-flex bg-info text-dark text-center justify-content-end rounded-bottom mb-2">
        <h6 className="pe-4  ">
          your budget for the {month}st month of year {year}
        </h6>
      </div>

      <div className="row justify-content-start ">
        {/* LEFT - income adder component */}
        <div className="col-2 m-1   ">
          <IncomeAdder
            userData={userData}
            year={year}
            month={month}
            retrievIncomeFromChild={retrievIncomeFromChild}
          />
        </div>

        {/* MIDDLE - New payee + Payments */}
        <div className="col-6">
            <Payments userData={userData} year={year} month={month} />
        </div>

        {/* RIGHT-  statistics component section*/}
        <div className="col-3">column 3</div>
      </div>
    </div>
  );
};
export default BudgetCalculator;
