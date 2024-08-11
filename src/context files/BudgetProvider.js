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
  const [selectedMonthsPayments, setSelectedMonthsPayments] = useState([]); // to do
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0); // to do

  // fetches ALL payments made by the user (THE COMPLETE HISTORY)
  const fetchAllSavedPayments = useCallback(async () => {
    try {
      console.error("fetching data");
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
  }, [month, year, userData.user_id]);

  useEffect(() => {
    if (userData.user_id) {
      fetchAllSavedPayments();
    }
  }, [fetchAllSavedPayments]);

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
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook for using context
export const useBudget = () => useContext(BudgetContext);
