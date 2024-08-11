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
  //_________________________________________________________________
  // STATUS OF THE USER
  //-----------------------------------------------------------------
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //______________________________________
  // SelectedDatePage.js
  //--------------------------------------
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  //______________________
  //  Summary.js
  //----------------------
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);

  //__________________________________________________________________
  // CreateNewPayment.js
  //------------------------------------------------------------------
  const [payeeList, setPayeeList] = useState([]); // fetched payee list saved by the user.

  //__________________________________________________________________
  // PaymentBoxSection.js
  //------------------------------------------------------------------
  const [allSavedPayments, setAllSavedPayments] = useState([]); // Fetched all payment data (THE COMPLETE HISTORY) when the component mounts
  const [selectedMonthsPayments, setSelectedMonthsPayments] = useState([]); // Filtered payments based on selected month and year

  // fetches ALL payments made by the user (THE COMPLETE HISTORY)
  const fetchAllSavedPayments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("Payments")
        .select("*, Payee(*)")
        .eq("user_id", userData.user_id);

      if (error) {
        throw error;
      }

      setAllSavedPayments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("fetched all saved payments successfully");
  }, [userData.user_id]);

  useEffect(() => {
    if (userData.user_id) {
      fetchAllSavedPayments();
    }
  }, [fetchAllSavedPayments]);

  // Filters payments based on year, month, or if they're marked as repeating
  const filterPayments = (year, month) => {
    const yearInt = parseInt(year, 10); // convert year into Int (Base 10)
    const monthInt = parseInt(month, 10); // convert month into Int (Base 10)

    const filteredPaymentData = allSavedPayments.filter((item) => {
      return (
        (item.year === yearInt && item.month === monthInt) ||
        item.Payee.is_repeating === true
      );
    });

    return filteredPaymentData;
  };

  const handlePaymentDeleteClick = async (paymentId) => {
    const paymentIdInt = parseInt(paymentId, 10); // convert year into Int (Base 10)

    try {
      const { error } = await supabase
        .from("Payments")
        .delete()
        .eq("payment_id", paymentIdInt);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error deleting a payee", error);
    }
    fetchAllSavedPayments();
  };

  // Automatically update the selected months payments whenever `allSavedPayments`, `year`, or `month` changes
  useEffect(() => {
    setSelectedMonthsPayments(filterPayments(year, month));
  }, [allSavedPayments, year, month]);

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
        selectedMonthsPayments, // Pass the filtered payments
        filterPayments, // Expose the filtering function for reuse
        handlePaymentDeleteClick,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook for using context
export const useBudget = () => useContext(BudgetContext);
