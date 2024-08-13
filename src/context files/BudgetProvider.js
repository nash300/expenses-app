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

  // Fetch payee list
  const fetchPayeeList = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("Payee")
        .select("*")
        .eq("user_id", userData.user_id);
      if (error) {
        throw error;
      }
      setPayeeList(data);
      console.log("Payee-list received:", data);
    } catch (error) {
      alert("Something went wrong");
      console.log("Error fetching payee-list", error);
    }
  }, [userData.user_id]);

  // Ensure fetchPayeeList is only called when user_id is defined
  useEffect(() => {
    if (userData.user_id) {
      fetchPayeeList();
    }
  }, [fetchPayeeList, userData.user_id]);

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

  // Ensure fetchAllSavedPayments is only called when user_id is defined
  useEffect(() => {
    if (userData.user_id) {
      fetchAllSavedPayments();
    }
  }, [fetchAllSavedPayments, userData.user_id]);

  // Filters payments based on year, month
  // used in Summary.js
  const filterPayments = (year, month) => {
    const yearInt = parseInt(year, 10); // convert year into Int (Base 10)
    const monthInt = parseInt(month, 10); // convert month into Int (Base 10)

    const filteredPaymentData = allSavedPayments.filter((item) => {
      return item.year === yearInt && item.month === monthInt;
    });
    return filteredPaymentData;
  };

  // Automatically update the selected months payments whenever `allSavedPayments`, `year`, or `month` changes
  useEffect(() => {
    setSelectedMonthsPayments(filterPayments(year, month));
  }, [allSavedPayments, year, month]);

  // delets a payment record in the database and re-fetches new data
  const deletePayment = async (paymentId) => {
    try {
      const { error } = await supabase
        .from("Payments")
        .delete()
        .eq("payment_id", paymentId);

      if (error) {
        throw error;
      } else {
        console.log("Payment record deleted");
      }
    } catch (error) {
      alert("Error deleting payment. Please try again");
      console.log("error deleting a payee", error);
    }
    fetchAllSavedPayments();
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
