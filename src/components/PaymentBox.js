const PaymentBox = ({ payeeName, sum }) => {
  return (
    <div>
      <div>name : {payeeName}</div>
      <div>sum : {sum}</div>
    </div>
  );
};

export default PaymentBox;
