import { useState } from "react";
import { useBudget } from "../context files/BudgetProvider";

const Summary = ({ selectedMonthsPayments }) => {
  const { totalIncome } = useBudget(); // Access the total income from the context

  // Filter out payments that are unpaid
  const unpaidPayments = selectedMonthsPayments.filter(
    (payment) => !payment.is_paid
  );

  // Filter out payments that are paid
  const paidPayments = selectedMonthsPayments.filter(
    (payment) => payment.is_paid
  );

  // Calculate total expenses for unpaid payments
  const totalUnpaidAmount = unpaidPayments.reduce((sum, payment) => {
    return sum + payment.sum;
  }, 0);

  // Calculate total expenses for unpaid payments
  const totalPaidAmount = paidPayments.reduce((sum, payment) => {
    return sum + payment.sum;
  }, 0);

  const balance = totalIncome - (totalPaidAmount + totalUnpaidAmount);

  return (
    <div className=" card mb-2 shadow mt-2 fixed">
      <div className=" card-header">
        <h3>Summary</h3>
      </div>
      <div className="card-body ">
        <div className="">
          <p className="card-text mt-3 mb-1 border-bottom ">
            Your total income for this month:
          </p>
          <h4 className="text-end">{totalIncome} Kr</h4>
        </div>
        <div className="">
          <p className="card-text mt-3 mb-1 border-bottom ">Total expenses:</p>
          <h4 className="text-end">{totalPaidAmount + totalUnpaidAmount} Kr</h4>
        </div>
        <div className="">
          <p className="card-text mt-3 mb-1 border-bottom ">
            Amount left after paying all expences:
          </p>
          <h4 className="text-danger text-end">{balance} Kr</h4>
        </div>
        <div className="">
          <p className="card-text mt-3 mb-1 border-bottom   ">
            Now remaining in your account:
          </p>
          <h4 className="text-warning text-end">{totalIncome - totalPaidAmount} Kr</h4>
        </div>
      </div>
    </div>
  );
};

export default Summary;
