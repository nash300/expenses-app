import PaymentBox from "../components/PaymentBox";
import { useBudget } from "../context files/BudgetProvider";

const PaymentBoxSection = () => {
  const { selectedMonthsPayments, deletePayment, fetchAllSavedPayments } =
    useBudget(); // Access the filtered payments

  // Categorize payments into repeated (Loan/Credit) and one-time (Bill) payments
  const loanAndCredit = selectedMonthsPayments
    .filter(
      (payment) =>
        payment.Payee.amount_left_to_pay && payment.Payee.initial_amount
    )
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort by payee name

  const bills = selectedMonthsPayments
    .filter((payment) => payment.Payee.category === "Bill")
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort by payee name

  return (
    <div className="mt-3">
      {/* Loan/Credit Section */}
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
        <p className="alert alert-success">No Loans & Credits</p>
      )}

      {/* Bill Section */}
      <h4 className="mt-5 mb-3">Other bills</h4>
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
        <p className="alert alert-success">No other bills</p>
      )}
    </div>
  );
};

export default PaymentBoxSection;