// functional component to display the summary of incomes and expences
import { useBudget } from "../context files/BudgetProvider";

const Summary = () => {
  const { totalIncome, selectedMonthsPayments } = useBudget(); // Access the filtered payments

  const totalExpenceAmount = selectedMonthsPayments.reduce((sum, payment) => {
    return sum + payment.sum;
  }, 0);

  return (
    <div className=" card mb-2 shadow">
      <div className="card-header ">Summary</div>
      <div className="card-body">
        <p className="card-text m-0">Total income :</p>
        <h3 className="">{totalIncome} Kr</h3>
        <p className="card-text m-0">Total expences :</p>
        <h3 className="">{totalExpenceAmount} Kr</h3>
        <p className="card-text text-danger m-0">Balance :</p>
        <h3 className="text-danger">{totalIncome - totalExpenceAmount} Kr</h3>
      </div>
    </div>
  );
};

export default Summary;
