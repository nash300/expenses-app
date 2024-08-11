// BudgetCalculator.js
import React from "react";
import { useBudget } from "../context files/BudgetProvider";
import IncomeAdder from "../components/IncomeAdder";
import AddAndCreateSection from "../components/AddAndCreateSection";
import Summary from "../components/Summary";
import PaymentBoxSection from "../components/PaymentBoxSection";

const BudgetCalculator = () => {
  const { totalIncome, totalPaymentAmount, year, month } = useBudget();

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
            <IncomeAdder year={year} month={month} />
          </div>
        </section>
        <section className="col-6 mb-2">
          <AddAndCreateSection year={year} month={month} />
          <PaymentBoxSection />
        </section>
        <section className="col-4">to-do. show statistics here</section>
      </div>
    </div>
  );
};

export default BudgetCalculator;
