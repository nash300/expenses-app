import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const HoverStatistics = () => {
  const { payeeId, allSavedPayments } = useBudget();

  // Filter payments made to the specific payee
  const allPaymentsMadeToThisPayee = allSavedPayments.filter(
    (p) => p.Payee.payee_id === payeeId
  );

  const payeeName =
    allPaymentsMadeToThisPayee.length > 0
      ? allPaymentsMadeToThisPayee[0].Payee.payee_name
      : "";
  const initialAmount =
    allPaymentsMadeToThisPayee.length > 0
      ? allPaymentsMadeToThisPayee[0].Payee.initial_amount
      : 0;
  const amountLeftToPayWhenCreated =
    allPaymentsMadeToThisPayee.length > 1
      ? allPaymentsMadeToThisPayee[1].Payee.amount_left_to_pay
      : 0;
  const accumulatedPaymentSum = allPaymentsMadeToThisPayee.reduce(
    (sum, payment) => sum + (payment.sum || 0),
    0
  );
  const numberOfTimesPaid = allPaymentsMadeToThisPayee.length;
  const averagePaymentAmountPerMonth =
    numberOfTimesPaid > 0 ? accumulatedPaymentSum / numberOfTimesPaid : 0;
  const amountLeftToPayAsPerToday =
    amountLeftToPayWhenCreated - accumulatedPaymentSum;

  const numberOfTimesNeededToPayOffFully =
    averagePaymentAmountPerMonth > 0
      ? amountLeftToPayAsPerToday / averagePaymentAmountPerMonth
      : 0;

  const monthsNeeded = Math.ceil(numberOfTimesNeededToPayOffFully); // Round up to ensure complete months
  const years = Math.floor(monthsNeeded / 12); // Calculate full years
  const remainingMonths = monthsNeeded % 12; // Calculate remaining months


  


  return (
    <div className="content mt-auto mb-5">
      {/* Part 2: Conditional Rendering of Payment Details */}
      <div>
        {initialAmount > 0 && (
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>{payeeName}</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                {/* Time to Pay Off Fully */}
                <div className="d-grid justify-content-between align-items-center">
                  <p className="card-text mb-0 me-3">
                    Calculated time to pay off fully:
                  </p>
                  <h3 className="card-text p-0 m-0">
                    {years} years and {remainingMonths} months
                  </h3>
                </div>
              </div>

              <div className="mb-3">
                {/* Initial Amount */}
                <div className="d-grid justify-content-between align-items-center">
                  <p className="card-text mb-0">Initial amount was:</p>
                  <h4 className="card-text mb-0">{initialAmount} Kr</h4>
                </div>
              </div>

              <div className="mb-3">
                {/* Average Payment Amount Per Month */}
                <div className="d-grid justify-content-between align-items-center">
                  <p className="card-text mb-0 me-5">
                    Average amount per month you have paid so far:
                  </p>
                  <h4 className="card-text mb-0">
                    {averagePaymentAmountPerMonth.toFixed(0)} Kr
                  </h4>
                </div>
              </div>

              <div className="mb-3">
                {/* Amount Left to Pay When Created */}
                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                  <p className="card-text mb-0">
                    Amount left to pay when created:
                  </p>
                  <p className="card-text mb-0">
                    {amountLeftToPayWhenCreated} Kr
                  </p>
                </div>
                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{
                      width: `${
                        (amountLeftToPayWhenCreated / initialAmount) * 100
                      }%`,
                    }}
                    aria-valuenow={
                      (amountLeftToPayWhenCreated / initialAmount) * 100
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {Math.round(
                      (amountLeftToPayWhenCreated / initialAmount) * 100
                    )}
                    %
                  </div>
                </div>
              </div>

              <div className="mb-3">
                {/* Amount Left to Pay As of Today */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text mb-0">
                    Amount left to pay as of today:
                  </p>
                  <p className="card-text mb-0">
                    {amountLeftToPayAsPerToday} Kr
                  </p>
                </div>
                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{
                      width: `${
                        amountLeftToPayWhenCreated > 0
                          ? (amountLeftToPayAsPerToday /
                              amountLeftToPayWhenCreated) *
                            100
                          : 0
                      }%`,
                    }}
                    aria-valuenow={
                      amountLeftToPayWhenCreated > 0
                        ? (amountLeftToPayAsPerToday /
                            amountLeftToPayWhenCreated) *
                          100
                        : 0
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {Math.round(
                      amountLeftToPayWhenCreated > 0
                        ? (amountLeftToPayAsPerToday /
                            amountLeftToPayWhenCreated) *
                            100
                        : 0
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverStatistics;
