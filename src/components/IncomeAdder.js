import { useState, useEffect } from "react";
import supabase from "../supabase";
import { useBudget } from "../context files/BudgetProvider";

const IncomeAdder = () => {
  const {
    userData,
    incomes,
    setIncomes,
    setTotalIncome,
    year,
    month,
  } = useBudget();

  // State to track visibility of the "Add Income" form
  const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);

  // State to manage the new income's description and amount
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch incomes from Supabase when the component mounts or year/month changes
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const { data, error } = await supabase
          .from("Income")
          .select("*")
          .eq("user_id", userData.user_id)
          .eq("year", parseInt(year))
          .eq("month", parseInt(month));

        if (error) {
          console.error("Error fetching incomes:", error);
          alert("There was an error fetching your incomes.");
        } else {
          setIncomes(data || []);
        }
      } catch (error) {
        console.error("Error fetching incomes:", error);
        alert("An error occurred while fetching incomes.");
      }
    };

    fetchIncome();
  }, [userData.user_id, year, month, setIncomes]);

  // Show the form to add a new income
  const handleAddIncomeClick = () => {
    setIsAddIncomeClicked(true);
  };

  // Handle changes to the income description input
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle changes to the amount input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Cancel adding a new income
  const handleCancelClick = () => {
    setIsAddIncomeClicked(false);
    setDescription("");
    setAmount("");
  };

  // Save the new income to Supabase and update local state
  const handleSaveIncomeClick = async () => {
    if (description && amount) {
      try {
        // Insert new income into Supabase
        const { error } = await supabase.from("Income").insert([
          {
            user_id: userData.user_id,
            year: parseInt(year),
            month: parseInt(month),
            description,
            amount: parseFloat(amount),
          },
        ]);

        if (error) {
          console.error("Error saving income:", error);
          alert("Failed to save income.");
        } else {
          // Update local state with the new income
          setIncomes((prevIncomes) => [
            ...prevIncomes,
            { description, amount: parseFloat(amount) },
          ]);

          // Clear input fields and hide the form
          handleCancelClick();
        }
      } catch (error) {
        console.error("Error saving income:", error);
        alert("An error occurred while saving the income.");
      }
    } else {
      alert("Please enter income source and amount.");
    }
  };

  // Delete an income from Supabase and update local state
  const handleMinusButtonClick = async (index) => {
    const incomeToDelete = incomes[index];

    if (incomeToDelete) {
      try {
        // Delete the income from Supabase
        const { error } = await supabase
          .from("Income")
          .delete()
          .eq("user_id", userData.user_id)
          .eq("year", parseInt(year))
          .eq("month", parseInt(month))
          .eq("description", incomeToDelete.description)
          .eq("amount", incomeToDelete.amount);

        if (error) {
          console.error("Error deleting income:", error);
          alert("Failed to delete income.");
        } else {
          // Update local state by removing the deleted income
          setIncomes((prevIncomes) =>
            prevIncomes.filter((_, i) => i !== index)
          );
        }
      } catch (error) {
        console.error("Error deleting income:", error);
        alert("An error occurred while deleting the income.");
      }
    }
  };

  // Calculate the total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  // Update total income in the parent component
  useEffect(() => {
    setTotalIncome(totalIncome);
  }, [totalIncome, setTotalIncome]);

  return (
    <div className="card text-white shadow m-4">
      <div className="card-header d-flex justify-content-between align-items-center ps-2 bg-primary">
        Add an Income
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleAddIncomeClick}
        >
          <b>+</b>
        </button>
      </div>
      <div className="container pb-3">
        <ul className="list-group">
          {/* Render the list of incomes */}
          {incomes.map((income, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center "
            >
              <div className="d-flex justify-content-between me-2 w-100">
                <b>{income.description}</b> {income.amount}Kr
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleMinusButtonClick(index)}
              >
                <b>-</b>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-body p-0">
        {/* Conditionally render input fields to add a new income */}
        {isAddIncomeClicked && (
          <div className="card-text text-center pb-3">
            <input
              className="form-control mb-2 mt-1"
              type="text"
              placeholder="Income source"
              value={description}
              onChange={handleDescriptionChange}
            />
            <input
              className="form-control mb-1"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSaveIncomeClick}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger ms-1"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeAdder;
