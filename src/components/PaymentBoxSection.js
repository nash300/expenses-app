import PaymentBox from "../components/PaymentBox"; // Component to display individual payment details
import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const PaymentBoxSection = () => {
  // Destructure relevant data and functions from the budget context
  const { selectedMonthsPayments, deletePayment, fetchAllSavedPayments } =
    useBudget();

  // Filter payments to categorize them into loans/credits and bills
  const loanAndCredit = selectedMonthsPayments
    .filter(
      (payment) =>
        payment.Payee.amount_left_to_pay && payment.Payee.initial_amount
    )
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort repeated payments by payee name

  const bills = selectedMonthsPayments
    .filter((payment) => payment.Payee.category === "Bill")
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort payments by payee name

  return (
    <div className="mt-3">
      {/* Section for Loans & Credits */}
      <h4 className="mb-3">Loans & Credits</h4>
      {loanAndCredit.length > 0 ? (
        loanAndCredit.map((payment) => (
          <PaymentBox
            key={payment.payment_id}
            paymentId={payment.payment_id}
            payeeName={payment.Payee.payee_name}
            paymentSum={payment.sum}
            initialAmount={payment.Payee.initial_amount}
            isPaid={payment.is_paid}
            amountLeftToPay={payment.Payee.amount_left_to_pay}
            deletePayment={deletePayment}
            fetchAllSavedPayments={fetchAllSavedPayments}
          />
        ))
      ) : (
        <p className="alert alert-success">No Loans & Credits</p> // Message when no loan/credit payments are present
      )}

      {/* Section for Other Bills */}
      <h4 className="mt-5 mb-3">Other Bills</h4>
      {bills.length > 0 ? (
        bills.map((payment) => (
          <PaymentBox
            key={payment.payment_id}
            paymentId={payment.payment_id}
            payeeName={payment.Payee.payee_name}
            paymentSum={payment.sum}
            deletePayment={deletePayment}
            isPaid={payment.is_paid}
            fetchAllSavedPayments={fetchAllSavedPayments}
          />
        ))
      ) : (
        <p className="alert alert-success">No Other Bills</p> // Message when no bill payments are present
      )}
    </div>
  );
};

export default PaymentBoxSection;
