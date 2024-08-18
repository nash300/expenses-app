import PaymentBox from "../components/PaymentBox"; // Component to display individual payment details
import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const PaymentBoxSection = () => {
  // Destructure relevant data and functions from the budget context
  const { selectedMonthsPayments, deletePayment, fetchAllSavedPayments , allSavedPayments} =
    useBudget();

  // Filtering repeated payments
  const repeatingPayments = selectedMonthsPayments
    .filter((payment) => payment.Payee.is_repeating && payment.Payee.initial_amount) // Filter repeated payments
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort by payee name

  // Filtering one-time payments
  const oneTimePayments = selectedMonthsPayments
    .filter(
      (payment) =>
        payment.Payee.category === "Bill" && !payment.Payee.is_repeating
    )
    .sort((a, b) => a.Payee.payee_name.localeCompare(b.Payee.payee_name)); // Sort payments by payee name

  return (
    <div className="content ">
      {/* Section for Loans & Credits */}

      <h4 className="mt-3">Monthly payments</h4>

      {repeatingPayments.length > 0 ? (
        repeatingPayments.map((payment) => (
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
            payeeId={payment.Payee.payee_id}
            category ={payment.Payee.category}
          />
        ))
      ) : (
        <p className="alert alert-success">No Loans & Credits</p> // Message when no loan/credit payments are present
      )}

      {/* Section for Other oneTimePayments */}
      <h4 className="mt-5 mb-3">Single payments</h4>
      {oneTimePayments.length > 0 ? (
        oneTimePayments.map((payment) => (
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
        <p className="alert alert-success">No payments registered</p> // Message when no bill payments are present
      )}
    </div>
  );
};

export default PaymentBoxSection;
