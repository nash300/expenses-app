// This component fetches saved payment data from the server
// As the user creates new payment records, it updates the database and fetches a new copy of payment records.
//____________________________________________________________________________________________________________
// *** IMPORTANT VARIABLES ***
// userData
// year
// month
// savedPayments - (previously stored data retrived from the server)
// sum - (total of all payment amounts)
//
// PARENT COMPONENTS
// <BudgetCalculator />
//
// *** CHILD COMPONENTS ***
// <PaymentBox/>
//
// *** DATA RECORDS RECIEVED FROM THE SERVER ***
// |from Payment table|
// payment_id, user_id, sum, is_paid, Payee(payee_id, payee_name, is_repeating, category, intrest_rate
//
// |from Payee table|
// payee_id, payee_name, is_repeating, category, intrest_rate
//

import { useEffect } from "react";
import supabase from "../supabase";
import PaymentBox from "./PaymentBox";
import { useBudget } from "../context files/BudgetProvider";

const PaymentsSection = () => {
  const {
    userData,
    year, // Access year from context
    month, // Access month from context
    setSavedPayments,
    savedPayments,setTotalPaymentAmount
  } = useBudget();

  useEffect(() => {
    const fetchSavedPayments = async () => {
      try {
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from("Payments") // Use the correct table name
          .select(
            "payment_id, user_id, sum, is_paid, Payee(payee_id, payee_name, is_repeating, category, intrest_rate)"
          )
          .eq("month", month)
          .eq("year", year);

        if (error) {
          throw error;
        }

        setSavedPayments(data);
        console.log("DATA Recieved :", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedPayments(); // Call the async function
  }, [userData.user_id, year, month]);

  // Calculate the total sum of payments whis is needed by the call-back function.
  useEffect(() => {
    const sum = savedPayments.reduce(
      (accumulator, payment) => accumulator + (payment.sum || 0),
      0
    );
    // pass the result to the parent component using the call-back function
    setTotalPaymentAmount(sum);
  }, [savedPayments, setSavedPayments]);

  return (
    <div>
      {savedPayments.map((payment) => (
        <PaymentBox
          key={payment.payment_id} // unique id
          sum={payment.sum}
          payee={payment.Payee.payee_name} // Use optional chaining in case Payee is undefined
        />
      ))}
    </div>
  );
};

export default PaymentsSection;
