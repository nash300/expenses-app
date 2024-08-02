/**********************************************************/
/* This component is the Card for adding/removing incomes */
/**********************************************************/
import { useState, useEffect } from "react";
import supabase from "../supabase";


const IncomeAdder = ({ userData, year, month }) => {

  console.log("month and year recieved by the income adder is :", {month},{year})
  // tracks the + button click in "add income" section
  const [isAddIncomeClicked, setIsAddIncomeClicked] = useState(false);

  // tracks all incomes
  const [incomes, setIncomes] = useState([]);

  // Handles the + button in 'add income' section.
  const handleAddIncomeClick = () => {
    setIsAddIncomeClicked(true);
  };

  // Temperraly tracks income inputs from the user
  // -these data are then used to update "incomes" state.
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Makes the input fields disappear as the user clicks on "Cancel" button.
  const handleCancelClick = () => {
    setIsAddIncomeClicked(false);
  };

  // Creates new 'income' object in 'incomes' state by collecting data from 'description' & 'amount' states
  // resetting the + button click state as it exits so that the input fields disappear.
  const handleSaveIncomeClick = () => {
    if (description && amount) {
      setIncomes((prevIncomes) => [
        ...prevIncomes,
        { description: description, amount: parseFloat(amount) },
      ]);
      setDescription("");
      setAmount("");
      setIsAddIncomeClicked(false);
    } else {
      alert("Please enter both description and amount correctly.");
    }
  };

  // Removes the corresponding record from the Incomes state as the user clicks on "-" button.
  const handleMinusButtonClick = (index) => {
    setIncomes((prevIncomes) => prevIncomes.filter((_, i) => i !== index));
  };

  // Calculate the total income by summing all amounts
  const totalIncome = incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  //  Fetches income amounts from Supabase as this component mounts.
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
          alert("There was an error !!!!!!");
        } else {
          console.log("recieved data is :" , data)

          setIncomes(data || []);
        }
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };
    fetchIncome();
  }, []);

  return (
    <div className="card text-white bg-primary mb-1 ">
      <div className="  card-header d-flex justify-content-between  ">
        Add an Income
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleAddIncomeClick}
        >
          +
        </button>
      </div>
      <div className="container m-1">
        <p className="card-text ">Total income of this month:</p>
        <h2> {totalIncome} Kr</h2>
      </div>
      <div className="container">
        {
          <ul className="list-group ">
            {/* Updates the list of incomes each time the user enters a new record*/}
            {incomes.map((income, index) => (
              <li
                key={index}
                className="list-group-item text-dark d-flex justify-content-between align-items-center p-0 ps-2"
              >
                {income.description}: {income.amount}Kr
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
        }
      </div>
      <div className="card-body">
        {/* conditionaly renders income input fields as the user clicks on + button*/}
        {isAddIncomeClicked && (
          <div className="card-text">
            <input
              className="form-control form-control-sm mb-2"
              type="text"
              placeholder="Income source"
              onChange={handleDescriptionChange}
            />
            <input
              className="form-control form-control-sm mb-1"
              type="number"
              placeholder="Amount"
              onChange={handleAmountChange}
            />
            <spann>
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
            </spann>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeAdder;
