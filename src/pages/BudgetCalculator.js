import React from "react";
import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context
import IncomeAdder from "../components/IncomeAdder"; // Component to add new income
import AddAndCreateSection from "../components/AddAndCreateSection"; // Section to add and create new budget
import Summary from "../components/Summary"; // Component to display summary of budget
import PaymentBoxSection from "../components/PaymentBoxSection"; // Component to show existing payments
import newPlanIcon from "../utilities/icons/1 (108).png"; // Icon for creating a new plan
import supabase from "../supabase"; // Supabase client for database operations
import HoverStatistics from "../components/HoverStatistics";
import CreditLoanStatistics from "../components/CreditLoanStatistics";

const BudgetCalculator = () => {
  // Destructure budget-related data and functions from the context
  const {
    totalIncome,
    totalPaymentAmount,
    year,
    month,
    selectedMonthsPayments,
    payeeList,
    userData,
    fetchAllSavedPayments,
    isHover,
  } = useBudget();

  // Array of month names for display purposes
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if there are no payments for the selected month and year
  const isNoPayments = selectedMonthsPayments.length === 0;
  console.log("selectedMonthsPayments:", selectedMonthsPayments);

  // Handler for creating a new budget plan
  const handleCreateNewPlanButtonClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Filter repeating payees from the payee list
    const repeatingPayees = payeeList.filter((payee) => payee.is_repeating);

    console.log("Payee list:", payeeList); // Log the full payee list
    console.log("Filtered repeating payees:", repeatingPayees); // Log repeating payees

    try {
      // Update existing payments to set is_paid to "true"
      const { data, error } = await supabase
        .from("Payments")
        .update({ is_paid: "true" })
        .eq("is_paid", "false")
        .select();

      if (error) {
        throw error; // Throw error if update fails
      }
      fetchAllSavedPayments(); // Refetch payments to update the display
      console.log("All old payments set to is_paid=TRUE"); // Log success
    } catch (error) {
      console.log("Error while changing is_paid attribute:", error); // Log error
    }

    // Prepare payments to insert
    const paymentsToInsert = repeatingPayees.map((payee) => ({
      user_id: userData.user_id,
      payee_id: payee.payee_id,
      year: year,
      month: month,
      is_paid: "false",
    }));

    try {
      // Insert new payments for the current month
      const { data, error } = await supabase
        .from("Payments")
        .insert(paymentsToInsert);

      if (error) {
        throw error; // Throw error if insertion fails
      }
      fetchAllSavedPayments(); // Refetch payments to update the display
      console.log("New budget created"); // Log success
    } catch (error) {
      console.log("Error while creating new payment record:", error); // Log error
    }
  };

  return (
    <div className="content">
      {/* TOP SECTION - Display selected month and year */}
      <section className="container-fluid p-0 mb-2">
        <div className="container">
          <h6>{monthOptions[month - 1]} {year}</h6>
        </div>
      </section>
  
      {/* BOTTOM SECTION - The main section */}
      <section className="container-fluid d-flex p-0 m-0" style={{ height: "100vh", width: "100%" }}>
        {/* LEFT - Display summary and income adder */}
        <section className="d-flex flex-column col-3 p-2">
          <div className="mb-3">
            <Summary
              totalIncome={totalIncome}
              totalPaymentAmount={totalPaymentAmount}
              selectedMonthsPayments={selectedMonthsPayments}
            />
          </div>
          <div>
            <IncomeAdder />
          </div>
        </section>
  
        {/* MIDDLE */}
        <section className="d-flex flex-column col-6 overflow-auto" style={{marginTop: "8px"}}>
          {/* MIDDLE TOP */}
          <AddAndCreateSection isEmpty={isNoPayments} />
  
          {/* Conditionally render payment section if payments exist */}
          {isNoPayments ? (
            <div className="alert alert-danger d-flex flex-column align-items-center shadow p-4 my-5" role="alert">
              <p>You haven't created a budget plan for this month yet.</p>
              <button
                type="button"
                className="btn btn-warning shadow mt-2"
                onClick={handleCreateNewPlanButtonClick}
              >
                <img
                  src={newPlanIcon}
                  alt="Create New Plan Icon"
                  style={{
                    height: "30px",
                    width: "30px",
                    marginRight: "10px",
                  }}
                />
                Create New Plan
              </button>
            </div>
          ) : (
            <PaymentBoxSection /> // MIDDLE BOTTOM - Show payment section if budget records exist
          )}
        </section>
  
        {/* RIGHT */}
        <section className=" d-grid col-3 overflow-scroll p-0 m-0">
          {/* RIGHT TOP - Show general statistics */}
          <div className="m-0">
            <CreditLoanStatistics />
          </div>
  
          {/* RIGHT BOTTOM - Show hover statistics on hover */}
          <div className=" d-grid  ">
            {isHover && <HoverStatistics />}
          </div>
        </section>
      </section>
    </div>
  );
  
};

export default BudgetCalculator;
