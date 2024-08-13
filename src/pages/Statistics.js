import { useBudget } from "../context files/BudgetProvider"; // Custom hook to access budget context

const Statistics = () => {
  // Destructure relevant data and functions from the budget context
  const { } = useBudget();

  return (
    <div className=" container d-grid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title pb-2">Statistics</h5>
          <div className="mb-4">
            <h6 class="card-subtitle mb-2 text-body-secondary">
              This month...
            </h6>
            <p className="card-text">
              you have {} payments
            </p>
          </div>
          <div className="mb-4">
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Card subtitle
            </h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
