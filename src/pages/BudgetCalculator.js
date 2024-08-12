// BudgetCalculator.js
import React from "react";
import { useBudget } from "../context files/BudgetProvider";
import IncomeAdder from "../components/IncomeAdder";
import AddAndCreateSection from "../components/AddAndCreateSection";
import Summary from "../components/Summary";
import PaymentBoxSection from "../components/PaymentBoxSection";
import newPlanIcon from "../utilities/icons/1 (108).png";
import supabase from "../supabase";

const BudgetCalculator = () => {
  const {
    totalIncome,
    totalPaymentAmount,
    year,
    month,
    selectedMonthsPayments,
    payeeList,
    userData,
    fetchAllSavedPayments,
  } = useBudget();

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

  //  if there exists budget records for the choosen year & month.
  const isEmpty = selectedMonthsPayments.length === 0;

  // set all previous payments "is_paid" attributes in the database to "true"
  // create a list of repeating payments and save them with current month.
  const handleCreateNewPlanButtonClick = async (e) => {
    e.preventDefault();

    // filtering the repeating payees from the payee list
    const repeatingPayees = payeeList.filter((payee) => payee.is_repeating);

    console.log("payee list :", payeeList);
    console.log("filtered repeating payees :", repeatingPayees);

    // updating all "is_paid" attributes in the database to "true"
    try {
      const { data, error } = await supabase
        .from("Payments")
        .update({ is_paid: "true" })
        .eq("is_paid", "false")
        .select();

      if (error) {
        throw error;
      }
      fetchAllSavedPayments();
      console.log("all old payments set to is_paid=TRUE");
    } catch (error) {
      console.log("error while changing is_true attribute ", error);
    }

    // Prepare the "repeatingPayees" array for bulk insertion
    const paymentsToInsert = repeatingPayees.map((payee) => ({
      user_id: userData.user_id,
      payee_id: payee.payee_id,
      year: year,
      month: month,
      is_paid: "false",
    }));

    // Inserting the new records and refetching "AllSavedPayments" so that the latest "PayeeBox" components will appear in the display
    try {
      const { data, error } = await supabase
        .from("Payments")
        .insert(paymentsToInsert);

      if (error) {
        throw error;
      }
      fetchAllSavedPayments();
      console.log("new budget created");
    } catch (error) {
      console.log("error while creating new payment record ", error);
    }
  };

  return (
    <div className="container-fluid">
      <section className="bg-info text-dark text-center justify-content-end rounded-bottom mb-2 p-2 mt-5 pt-4">
        <h6 className="pe-4">
          {monthOptions[month - 1]} {year}
        </h6>
      </section>
      <div className="row justify-content-start">
        <section className="col-2 mb-2">
          <div>
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
        <section className="col-6 mb-2">
          <AddAndCreateSection isEmpty={isEmpty} />
          {/* Checks to see if there exists budget records for the choosen year & month. 
          If it is empty, give option to start new plan */}
          {isEmpty ? (
            <div
              className=" alert alert-danger justify-content-center align-items-center shadow p-5 m-5"
              role="alert"
            >
              <p className="d-flex justify-content-center align-items-center">
                You havn't created a budget plan for this month yet.
              </p>
              <div className="d-flex justify-content-center align-items-center col">
                {/* Button for initialize a new budget for the current month */}
                <button
                  type="button"
                  className="btn btn-warning shadow"
                  onClick={handleCreateNewPlanButtonClick}
                >
                  <img
                    className="card-img-top "
                    src={newPlanIcon}
                    alt="Card image cap"
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
            <PaymentBoxSection /> //if there exists budget records, proceed normal
          )}
        </section>
        <section className="col-4">to-do. show statistics here</section>
      </div>
    </div>
  );
};

export default BudgetCalculator;
