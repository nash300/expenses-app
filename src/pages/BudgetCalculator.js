import React from "react";
import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context
import IncomeAdder from "../components/IncomeAdder"; // Component to add new income
import AddAndCreateSection from "../components/AddAndCreateSection"; // Section to add and create new budget
import Summary from "../components/Summary"; // Component to display summary of budget
import PaymentBoxSection from "../components/PaymentBoxSection"; // Component to show existing payments
import newPlanIcon from "../utilities/icons/1 (108).png"; // Icon for creating a new plan
import supabase from "../supabase"; // Supabase client for database operations
import Statistics from "./Statistics";

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
    <div
      className="content "
    >
      {/* TOP SECTION- Display selected month and year */}
      <section
        className="container-fluid d-flex p-0 mb-1"
        style={{ height: "auto" }}
      >
        <div className="container ">
          <h6 className="d-flex">
            {monthOptions[month - 1]} {year}{" "}
          </h6>
        </div>
      </section>

      {/* BOTTOM SECTION- The main section */}

      <section
        className="container-fluid d-flex col p-0 m-0"
        style={{ height: "100vh", width: "100%" }}
      >
        {/*  LEFT- Display summary and income adder */}

        <section className=" d-grid container p-0 m-0 col-3" style={{maxHeight: "90vh"}} >
          <div className=" ">
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

        {/* MIDDLE  */}

        <section className="d-grid container p-0 m-0 pb-5 col-6 overflow-scroll" style={{ overflowX: "hidden" }}>
          {/* MIDDLE TOP  */}

          <AddAndCreateSection isEmpty={isNoPayments} />
          {/* Conditionally render payment section if payments exist */}

          {/* Create new plan section */}

          {isNoPayments ? (
            <div
              className="alert alert-danger justify-content-center align-items-center shadow p-5 m-5"
              role="alert"
            >
              <p className="d-flex justify-content-center align-items-center">
                You haven't created a budget plan for this month yet.
              </p>
              <div className="d-flex justify-content-center align-items-center col">
                <button
                  type="button"
                  className="btn btn-warning shadow"
                  onClick={handleCreateNewPlanButtonClick}
                >
                  <img
                    className="card-img-top"
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
            </div>
          ) : (
            <PaymentBoxSection /> // MIDDLE BOTTOM - Show payment section if budget records exist
          )}
        </section>

        {/*RIGHT - Show statistics based on mouse hover*/}
        <section className="d-grid container p-0 m-0 col-3">
          {isHover && <Statistics />}
        </section>
      </section>
    </div>
  );
};

export default BudgetCalculator;
