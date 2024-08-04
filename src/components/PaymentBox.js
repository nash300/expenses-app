import React from "react";

const PaymentBox = ({ payee, sum }) => {
  return (
    <div className="row text-center p-1 m-1 mt-3 alert alert-secondary align-items-center shadow-sm">
      <div className=" col-8">{payee}</div>
      <h5 className="col-2">{sum}</h5>
      <aside className="col-2" >
        <a href="#" className="btn btn-primary" >
          delete (to do)
        </a>
        
      </aside>
    </div>
  );
};

export default PaymentBox;
