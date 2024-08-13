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

  // Calculate total expenses for paid payments
  const totalPaidAmount = paidPayments.reduce((sum, payment) => {
    return sum + payment.sum;
  }, 0);

  // Calculate balance
  const balance = totalIncome - (totalPaidAmount + totalUnpaidAmount);

  // Calculate progress percentage
  const progressPercentage =
    totalIncome > 0
      ? ((totalPaidAmount + totalUnpaidAmount) / totalIncome) * 100
      : 0;

  return (
    <div className="card m-4 shadow">
      <div className="card-header text-center">
        <h3>Summary</h3>
      </div>
      <div className="card shadow pt-1 p-3 m-2">
        <div className="mb-3">
          {/* Total Income */}
          <div className="d-grid justify-content-between align-items-center  pt-2">
            <p className="card-text mb-0 me-5">
              Your total income for this month:
            </p>
            <h4 className="mb-0">{totalIncome} Kr</h4>
          </div>
        </div>
        

        <div className="">
  {/* Total Expenses */}
  <div className="d-grid justify-content-between align-items-center border-top pt-2">
    <p className="card-text mb-0">Total expenses:</p>
    <h4 className="mb-0">{totalPaidAmount + totalUnpaidAmount} Kr</h4>
  </div>
  
  {/* Progress Bar */}
  <div
    className="progress mt-2"
    role="progressbar"
    aria-label="Expenses Progress"
    aria-valuenow={progressPercentage}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      className={`progress-bar ${progressPercentage > 100 ? 'bg-danger' : ''}`}
      style={{ width: `${progressPercentage}%` }}
    >
      {Math.round(progressPercentage)}%
    </div>
  </div>
</div>



      </div>
      <div className="card shadow p-3 ">
        <div className="mb-3 shaddow">
          {/* Balance */}
          <div className="d-grid justify-content-between align-items-center  ">
            <p className="card-text mb-0  ">
              Amount left after paying all expenses:
            </p>
            <h4 className="text-danger mb-0">{balance} Kr</h4>
          </div>
        </div>
        <div>
          {/* Remaining in Account */}
          <div className="d-grid justify-content-between align-items-center border-top pt-2 ">
            <p className="card-text mb-0 me-5">
              Now remaining in your account:
            </p>
            <h4 className="text-warning mb-0">
              {totalIncome - totalPaidAmount} Kr
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
