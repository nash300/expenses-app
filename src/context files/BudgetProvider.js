import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import supabase from "../supabase";

// Create Context
const BudgetContext = createContext();

// Create a provider component
export const BudgetProvider = ({ children }) => {
  // User status state
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Selected date for filtering payments
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  // State for incomes and total income
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);

  // State for payee list
  const [payeeList, setPayeeList] = useState([]);

  // Fetch payee list based on user ID
  const fetchPayeeList = useCallback(async () => {
    try {
      console.log("Fetching payee list for user:", userData.user_id);
      const { data, error } = await supabase
        .from("Payee")
        .select("*")
        .eq("user_id", userData.user_id);
      if (error) {
        throw error;
      }
      setPayeeList(data);
      console.log("Payee list fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching payee list:", error);
      alert("Something went wrong while fetching the payee list.");
    }
  }, [userData.user_id]);

  // Call fetchPayeeList when user ID changes
  useEffect(() => {
    if (userData.user_id) {
      fetchPayeeList();
    }
  }, [fetchPayeeList, userData.user_id]);

  // State for payments data
  const [allSavedPayments, setAllSavedPayments] = useState([]);
  const [selectedMonthsPayments, setSelectedMonthsPayments] = useState([]);

  // Fetch all saved payments
  const fetchAllSavedPayments = useCallback(async () => {
    try {
      console.log("Fetching all saved payments for user:", userData.user_id);
      const { data, error } = await supabase
        .from("Payments")
        .select("*, Payee(*)")
        .eq("user_id", userData.user_id);

      if (error) {
        throw error;
      }

      setAllSavedPayments(data);
      console.log("All saved payments fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching all saved payments:", error);
    }
  }, [userData.user_id]);

  // Call fetchAllSavedPayments when user ID changes
  useEffect(() => {
    if (userData.user_id) {
      fetchAllSavedPayments();
    }
  }, [fetchAllSavedPayments, userData.user_id]);

  // Filter payments by year and month
  const filterPayments = (year, month) => {
    const yearInt = parseInt(year, 10);
    const monthInt = parseInt(month, 10);

    console.log(`Filtering payments for year ${yearInt} and month ${monthInt}`);
    const filteredPaymentData = allSavedPayments.filter((item) => {
      return item.year === yearInt && item.month === monthInt;
    });

    console.log("Filtered payments:", filteredPaymentData);
    return filteredPaymentData;
  };

  // Update selected months payments when data or date changes
  useEffect(() => {
    setSelectedMonthsPayments(filterPayments(year, month));
  }, [allSavedPayments, year, month]);

  // Delete a payment record and refresh payments
  const deletePayment = async (paymentId) => {
    try {
      console.log("Deleting payment with ID:", paymentId);
      const { error } = await supabase
        .from("Payments")
        .delete()
        .eq("payment_id", paymentId);

      if (error) {
        throw error;
      }
      console.log("Payment record deleted successfully.");
      fetchAllSavedPayments(); // Refresh payment data
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Error deleting payment. Please try again.");
    }
  };
  // Tracks mouse hovering state
  const [isHover, setIsHover] = useState(false);

  const updateIsHover = (state) => {
    setIsHover(state);
    console.log("is hover updated to ", state);
  };

  return (
    <BudgetContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        incomes,
        setIncomes,
        totalIncome,
        setTotalIncome,
        year,
        setYear,
        month,
        setMonth,
        payeeList,
        setPayeeList,
        fetchAllSavedPayments,
        allSavedPayments,
        setAllSavedPayments,
        selectedMonthsPayments,
        deletePayment,
        fetchPayeeList,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook for using context
export const useBudget = () => useContext(BudgetContext);
