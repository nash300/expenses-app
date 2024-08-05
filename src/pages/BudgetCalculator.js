/*********************************************************************/
/* The page for displaying and calculating the incomes and expenses. */
/*********************************************************************/
// --- IMPORTANT VARIABLES ---
// totalIncome - (total income recieved from the child component)
// userData - (basic data of the current user (i.g: user_id, first_name))
// month - (selected month)
// year - (selected year)
// totalPaymentAmount - (total amount of all payments recieved by the call-back function)
//
// --- CHILD COMPONENTS ---
// <NewPayee />
// <PaymentsSection />

import { useState } from "react";
import IncomeAdder from "../components/IncomeAdder";
import { useLocation } from "react-router-dom";
import AddAndCreateSection from "../components/AddAndCreateSection";
import PaymentsSection from "../components/PaymentsSection";
import Summary from "../components/Summary";

const BudgetCalculator = ({ userData }) => {
  const location = useLocation();

  // Access the data from location.state
  const { month, year } = location.state || {};

  // Stores the total income sent by the child component (IncomeAdder)
  const [totalIncome, setTotalIncome] = useState(null);
  const retrieveIncomeFromChild = (income) => {
    setTotalIncome(income);
  };

  // tracks total amount of payments recieved by the call-back function
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);

  // Call-back function to retrive total payment amount
  const retrieveTotalPaymentAmount = (sum) => {
    console.log("Total Payment Amount from Child:", sum);
    setTotalPaymentAmount(sum);
  };

  return (
    <div className="container-fluid">
      {/* info section */}
      <section className="bg-info text-dark text-center justify-content-end rounded-bottom mb-2 p-2">
        <h6 className="pe-4">
          Your budget for the {month} month of year {year}
        </h6>
      </section>

      <div className="row justify-content-start">
        {/*---------------  LEFT SECTION ----------------- */}
        <section className="col-2 mb-2">
          {/* LEFT-TOP */}
          <div>
            <Summary
              totalIncome={totalIncome}
              totalPaymentAmount={totalPaymentAmount}
            />
          </div>
          {/* LEFT - BOTTOM */}
          <div>
            <IncomeAdder
              userData={userData}
              year={year}
              month={month}
              retrieveIncomeFromChild={retrieveIncomeFromChild}
            />
          </div>
        </section>

        {/* MIDDLE SECTION */}
        <section className="col-6 mb-2">
          {/* MIDDLE-TOP */}
          <AddAndCreateSection userData={userData} year={year} month={month} />

          {/* MIDDLE-BOTTOM */}
          <PaymentsSection
            userData={userData}
            year={year}
            month={month}
            retrieveTotalPaymentAmount={retrieveTotalPaymentAmount}
          />
        </section>

        {/* RIGHT SECTION */}
        <section className="col-4">to-do. show statics here</section>
      </div>
    </div>
  );
};

export default BudgetCalculator;
