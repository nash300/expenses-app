// BudgetProvider.js
import React, { createContext, useState, useContext } from "react";

// Create Context
const BudgetContext = createContext();

// Create a provider component
export const BudgetProvider = ({ children }) => {
  // State to store authenticated user data retrieved from the server

  const [userData, setUserData] = useState([]);

  // State to track authentication status: true if logged in, false otherwise

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [totalIncome, setTotalIncome] = useState(null);
  const [createdAnewPayment, setCreatedAnewPayment] = useState(false);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  // Stores any previously saved data records retrived from the server
  const [savedPayments, setSavedPayments] = useState([]);

  // State to track all incomes
  const [incomes, setIncomes] = useState([]);

  // stores the fetched (from server) payee list
  const [payeeList, setPayeeList] = useState([]);

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
        createdAnewPayment,
        setCreatedAnewPayment,
        totalPaymentAmount,
        setTotalPaymentAmount,
        year,setYear,month, setMonth,
        
        savedPayments,
        setSavedPayments,
        payeeList,
        setPayeeList,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook for using context
export const useBudget = () => useContext(BudgetContext);
