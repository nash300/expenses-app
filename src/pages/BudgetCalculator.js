// BudgetCalculator.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context files/BudgetProvider";
import IncomeAdder from "../components/IncomeAdder";
import AddAndCreateSection from "../components/AddAndCreateSection";
import PaymentsSection from "../components/PaymentsSection";
import Summary from "../components/Summary";

const BudgetCalculator = () => {
  const {
    totalIncome,
    setTotalIncome,
    totalPaymentAmount,
    setTotalPaymentAmount,
    year,
    month,
  } = useBudget();

  const navigate = useNavigate();

  // Redirect to select date page if year or month is not set
  useEffect(() => {
    if (!year || !month) {
      console.log("Redirecting to SelectDatePage because year or month is missing.");
      navigate("/select-date");
    }
  }, [year, month, navigate]); // Ensure dependencies are complete and correct

 
  const retrieveTotalPaymentAmount = (sum) => {
    console.log("Total Payment Amount from Child:", sum);
    setTotalPaymentAmount(sum);
  };

  return (
    <div className="container-fluid">
      <section className="bg-info text-dark text-center justify-content-end rounded-bottom mb-2 p-2">
        <h6 className="pe-4">
          Your budget for the {month} month of year {year}
        </h6>
      </section>
      <div className="row justify-content-start">
        <section className="col-2 mb-2">
          <div>
            <Summary
              totalIncome={totalIncome}
              totalPaymentAmount={totalPaymentAmount}
            />
          </div>
          <div>
            <IncomeAdder
              year={year}
              month={month}
            />
          </div>
        </section>
        <section className="col-6 mb-2">
          <AddAndCreateSection year={year} month={month} />
          <PaymentsSection
            year={year}
            month={month}
            retrieveTotalPaymentAmount={retrieveTotalPaymentAmount}
          />
        </section>
        <section className="col-4">to-do. show statistics here</section>
      </div>
    </div>
  );
};

export default BudgetCalculator;
