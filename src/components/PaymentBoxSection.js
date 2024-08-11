import PaymentBox from "../components/PaymentBox";
import { useBudget } from "../context files/BudgetProvider";

const PaymentBoxSection = () => {
  const { allSavedPayments, year, month } = useBudget();
  console.log("all saved payments in PaymentBoxSection", allSavedPayments);

  // Convert state values to integers
  const yearInt = parseInt(year, 10); // convert year into Int (Base 10)
  const monthInt = parseInt(month, 10); // convert month into Int (Base 10)

  // Filter payment data based on year and month
  const filteredPaymentData = allSavedPayments.filter((item) => {
    return ((item.year === yearInt && item.month === monthInt ) || item.Payee.is_repeating == true);
  });

  return (
    <div>
      {filteredPaymentData.length > 0 ? (
        filteredPaymentData.map((payment) => (
          <PaymentBox key={payment.id} payeeName={payment.Payee.payee_name} sum={payment.sum}/>
        ))
      ) : (
        <p>No payments found for the selected year and month.</p>
      )}
    </div>
  );
};

export default PaymentBoxSection;
