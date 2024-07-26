/*
BUDGET CALCULATOR PAGE 

- This page retrieves payee information from the server and categorizes them into fixed bills, one-time bills, 
and paid bills.
 */

import React, { useEffect, useState } from "react";
import "./budgetCalculator.css";
import supabase from "../supabase";
import PayeeBox from "../components/PayeeBox"

function BudgetCalculator(props) {
  // Props:
  // id:  User id of the current user that is stored in supabase
  // user_name:  User name of the current user
  // first_name:  First name of the current user
  const { currentUser } = props;
  const [payeeList, setPayeeList] = useState([]);
  const [fixedBills, setFixedBills] = useState([]);
  const [oneTimeBills, setOneTimeBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Fetch payee data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Payee")
          .select("*")
          .eq("user_id", currentUser.id);
        if (error) {
          throw error;
        }
        // Update state with fetched data
        setPayeeList(data);
      } catch (error) {
        console.error("Error fetching payee data:", error.message);
      }
    };
    fetchData();
  }, [currentUser.id]);

  // Update fixed bills when payeeList changes
  useEffect(() => {
    setFixedBills(payeeList.filter((payee) => payee.fixed && !payee.is_paid));
  }, [payeeList]);

  // Update one-time bills when payeeList changes
  useEffect(() => {
    setOneTimeBills(
      payeeList.filter((payee) => !payee.fixed && !payee.is_paid)
    );
  }, [payeeList]);

  // Update paid bills when payeeList changes
  useEffect(() => {
    setPaidBills(payeeList.filter((payee) => payee.is_paid));
  }, [payeeList]);

  // Handle checkbox state change.
  const onCheck = (payeeId, isChecked) => {
    // Find the payee in the payeeList array
    const updatedPayeeList = payeeList.map((payee) => {
      if (payee.id === payeeId) {
        // Update the is_paid property of the payee
        return { ...payee, is_paid: isChecked };
      }
      return payee;
    });

    // Update the state with the modified payee list
    setPayeeList(updatedPayeeList);
  };

  // Display current date/time/second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div id="budget-calculator-page">
      <div id="calculator-page-wrapper">
        <section id="menu-section">
          User : {currentUser.first_name}
          <br />
          {currentDateTime.toLocaleDateString()}
          <br />
          {currentDateTime.toLocaleTimeString()}
        </section>
        <div id="content-wrapper">
          <section id="payee-section">
            <div id="all-payee-wrapper">
              <section id="fixed-bills-section">
                <div id="fixed-bills-section-header">
                  <h3>📈 Fixed bills </h3>
                </div>
                <div id="fixed-bills-display">
                  {fixedBills.map((payee, index) => (
                    <PayeeBox
                      key={index}
                      name={payee.payee_name}
                      sum={payee.sum}
                      is_paid={payee.is_paid}
                      onCheck={(isChecked) => onCheck(payee.id, isChecked)}
                    />
                  ))}
                </div>
              </section>
              <section id="one-time-bills-section">
                <div id="one-time-bills-section-header">
                  <h3>📉 One time bills </h3>
                </div>
                <div id="one-time-bills-display">
                  {oneTimeBills.map((payee, index) => (
                    <PayeeBox
                      key={index}
                      name={payee.payee_name}
                      sum={payee.sum}
                      is_paid={payee.is_paid}
                      onCheck={(isChecked) => onCheck(payee.id, isChecked)}
                    />
                  ))}
                </div>
              </section>
              <section id="statistics-section">
                {paidBills.map((payee, index) => (
                  <PayeeBox
                    key={index}
                    name={payee.payee_name}
                    sum={payee.sum}
                    is_paid={payee.is_paid}
                    onCheck={(isChecked) => onCheck(payee.id, isChecked)}
                  />
                ))}
              </section>
            </div>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BudgetCalculator;
