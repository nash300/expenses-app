import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const CreditLoanStatistics = () => {
  const { allSavedPayments } = useBudget();

  // Calculate the initial amounts for Loans and Credits
  const initialLoans = allSavedPayments.reduce((sum, p) => {
    if (p.Payee.category === "Loan") {
      return sum + parseInt(p.Payee.initial_amount) || 0;
    }
    return sum;
  }, 0);

  const initialCredits = allSavedPayments.reduce((sum, p) => {
    if (p.Payee.category === "Credit-Card") {
      return sum + parseInt(p.Payee.initial_amount) || 0;
    }
    return sum;
  }, 0);

  // Calculate the amounts paid so far for Loans and Credits
  const totalPaidForLoans = allSavedPayments.reduce((sum, p) => {
    if (p.Payee.category === "Loan") {
      return sum + parseInt(p.sum) || 0;
    }
    return sum;
  }, 0);

  const totalPaidForCredit = allSavedPayments.reduce((sum, p) => {
    if (p.Payee.category === "Credit-Card") {
      return sum + parseInt(p.sum) || 0;
    }
    return sum;
  }, 0);

  // Calculate the remaining amounts to be paid
  const remainingLoansToPay = initialLoans - totalPaidForLoans;
  const remainingCreditsToPay = initialCredits - totalPaidForCredit;

  // Calculate progress percentages (highlighting the amount left to pay)
  const loanProgressPercentage = initialLoans > 0 ? (remainingLoansToPay / initialLoans) * 100 : 0;
  const creditProgressPercentage = initialCredits > 0 ? (remainingCreditsToPay / initialCredits) * 100 : 0;

  return (
    <div className="content card mt-3">
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h3>Loan & Credit Summary</h3>
      </div>
      
      {/* Loans */}
      <div className="card-body">
        <div className="card m-2 shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="card-text mb-0">Total initial amount for Loans:</p>
            <h4 className="mb-0">{initialLoans} Kr</h4>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="card-text mb-0">Remaining amount to pay for Loans:</p>
            <h4 className="mb-0 text-danger">{remainingLoansToPay} Kr</h4>
          </div>

          <div className="progress mt-2" role="progressbar" aria-label="Loans Progress" aria-valuenow={loanProgressPercentage} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-warning" style={{ width: `${loanProgressPercentage}%` }}>
              {Math.round(loanProgressPercentage)}%
            </div>
          </div>
        </div>
      
        {/* Credits */}
        <div className="card m-2 shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="card-text mb-0">Total initial amount for Credits:</p>
            <h4 className="mb-0">{initialCredits} Kr</h4>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="card-text mb-0">Remaining amount to pay for Credits:</p>
            <h4 className="mb-0 text-danger">{remainingCreditsToPay} Kr</h4>
          </div>

          <div className="progress mt-2" role="progressbar" aria-label="Credits Progress" aria-valuenow={creditProgressPercentage} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-warning" style={{ width: `${creditProgressPercentage}%` }}>
              {Math.round(creditProgressPercentage)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default CreditLoanStatistics;
