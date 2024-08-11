import PaymentBox from "../components/PaymentBox";
import { useBudget } from "../context files/BudgetProvider";

const PaymentBoxSection = () => {
  const { selectedMonthsPayments } = useBudget(); // Access the filtered payments

  return (
    <div className="mt-3 ">
      {selectedMonthsPayments.length > 0 ? (
        selectedMonthsPayments.map((payment) => (
          <PaymentBox
            key={payment.payment_id}
            payeeName={payment.Payee.payee_name}
            paymentSum={payment.sum}
            isPaid={payment.is_paid}
            amountLeftToPay={payment.Payee.amount_left_to_pay}
          />
        ))
      ) : (
        <p>No payments found for the selected year and month.</p>
      )}
    </div>
  );
};

export default PaymentBoxSection;
