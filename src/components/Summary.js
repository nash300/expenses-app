import { useBudget } from "../context files/BudgetProvider";

const Summary = ({ selectedMonthsPayments }) => {
  const { totalIncome } = useBudget(); // Access the total income from the context

 // Filter out payments that are unpaid
 const unpaidPayments = selectedMonthsPayments.filter(payment => !payment.is_paid);

 // Calculate total expenses for unpaid payments
 const totalExpenseAmount = unpaidPayments.reduce((sum, payment) => {
   return sum + payment.sum;
 }, 0);

  // Calculate balance
  const balance = totalIncome - totalExpenseAmount;

  return (
    <div className="card mb-2 shadow mt-2 fixed">
      <div className="card-header">Summary</div>
      <div className="card-body">
        <p className="card-text m-0">Total income :</p>
        <h3>{totalIncome} Kr</h3>
        <p className="card-text m-0">Total expenses :</p>
        <h3>{totalExpenseAmount} Kr</h3>
        <p className="card-text text-danger m-0">Balance :</p>
        <h3 className="text-danger">{balance} Kr</h3>
      </div>
    </div>
  );
};

export default Summary;
