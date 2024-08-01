import IncomeAdder from "../components/IncomeAdder";

const BudgetCalculator = ({ userData }) => {
  return (
    <div className=".container-fluid  ">
      <div className="row  ">
        <div className="col-3 m-1   ">
          <IncomeAdder />
        </div>

        {/* PAYEE COMPONENT DISPLAY SECTION------------------------------------ */}
        <div className="col-5">column 2</div>

        {/* STATISTICS SECTION------------------------------------------------- */}
        <div className="col-1">column 3</div>
      </div>
    </div>
  );
};
export default BudgetCalculator;
