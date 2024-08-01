import IncomeAdder from "../components/IncomeAdder";
import { useLocation } from "react-router-dom";

const BudgetCalculator = ({ userData }) => {
  const location = useLocation();

  // Access the data from location.state
  const { month, year } = location.state || {};

  return (
    <div className=".container-fluid">
      {/* info section */}
      <div className=" d-flex bg-info text-dark text-center justify-content-end rounded-bottom">
        <h6 className="pe-4  ">
          your budget for the {month}st month of year {year}
        </h6>
      </div>

      <div className="row justify-content-start ">
        {/* income adder component */}
        <div className="col-2 m-1   ">
          <IncomeAdder />
        </div>

        {/* payee component section*/}
        <div className="col-6">payee</div>

        {/*  statistics component section*/}
        <div className="col-3">column 3</div>
      </div>
    </div>
  );
};
export default BudgetCalculator;
