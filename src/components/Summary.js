// functional component to display the summary of incomes and expences

const Summary = ({ totalIncome, totalPaymentAmount }) => {
  return (
    <div className=" card mb-2 shadow">
      <div className="card-header ">Summary</div>
      <div className="card-body">
        <p className="card-text m-0">Total income :</p>
        <h3 className="">{totalIncome} Kr</h3>
        <p className="card-text m-0">Total expences :</p>
        <h3 className="">{totalPaymentAmount} Kr</h3>
        <p className="card-text text-danger m-0">Balance :</p>
        <h3 className="text-danger">{totalIncome - totalPaymentAmount} Kr</h3>
      </div>
    </div>
  );
};

export default Summary;
