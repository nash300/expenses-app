import { useEffect, useState } from "react";
import supabase from "../supabase";

const SavedPaymentsSection = ({ userData, year, month }) => {
  const [savedPayments, setSavedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedPayments = async () => {
      try {

        // Fetch data from Supabase
        const { data, error } = await supabase
          .from("Payments") // Use the correct table name
          .select("payment_id, sum, is_paid, Payee(payee_id, payee_name)")
          .eq("month", month)
          .eq("year", year)
         

        if (error) {
          throw error;
        }

        setSavedPayments(data);
        console.log("DATA RECIEBED :", data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPayments(); // Call the async function
  }, [userData.user_id, year, month]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {savedPayments.length === 0 ? (
        <div>No payments found.</div>
      ) : (
        <div>
          {savedPayments.map((payment) => (
            <li key={payment.id}>
              {payment.sum} - {payment.Payee.payee_name} 
             
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPaymentsSection;
