import { useState, useEffect } from "react";
import supabase from "../supabase";

const IncomeAdder = ({ userData, year, month }) => {
  // State to track if the "Add Income" section is visible
  const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);

  // State to track all incomes
  const [incomes, setIncomes] = useState([]);

  // State to track the new income's description and amount
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
  }, [userData.user_id, year, month]);

  // Handles the click event to show the add income form
  const handleAddIncomeClick = () => {
    setIsAddIncomeClicked(true);
  };

  // Updates the description state as the user types
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Updates the amount state as the user types
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handles the click event to cancel adding a new income
  const handleCancelClick = () => {
    setIsAddIncomeClicked(false);
  };

  // Handles the click event to save a new income
  const handleSaveIncomeClick = async () => {
    if (description && amount) {
      try {
        // Save the new income to Supabase
        const { error } = await supabase
          .from("Income")
          .insert([
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
          setDescription("");
          setAmount("");
          setIsAddIncomeClicked(false);
        }
      } catch (error) {
        console.error("Error saving income:", error);
        alert("An error occurred while saving the income.");
      }
    } else {
      alert("Please enter both description and amount.");
    }
  };

  // Handles the click event to delete an income
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
          // Update local state by removing the income
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

  // Calculate the total income by summing all amounts
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="card text-white bg-primary mb-1">
      <div className="card-header d-flex justify-content-between">
        Add an Income
        <button type="button" className="btn btn-dark" onClick={handleAddIncomeClick}>
          +
        </button>
      </div>
      <div className="container m-1">
        <p className="card-text">Total income of this month:</p>
        <h2>{totalIncome} Kr</h2>
      </div>
      <div className="container">
        <ul className="list-group">
          {/* Render the list of incomes */}
          {incomes.map((income, index) => (
            <li
              key={index}
              className="list-group-item text-dark d-flex justify-content-between align-items-center p-0 ps-2"
            >
              {income.description}: {income.amount} Kr
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => handleMinusButtonClick(index)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        {/* Conditionally render input fields to add a new income */}
        {isAddIncomeClicked && (
          <div className="card-text">
            <input
              className="form-control form-control-sm mb-2"
              type="text"
              placeholder="Income source"
              value={description}
              onChange={handleDescriptionChange}
            />
            <input
              className="form-control form-control-sm mb-1"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <div>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSaveIncomeClick}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-dark ms-1"
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
