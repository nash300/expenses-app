const CreateNewPayment = ({ userData, setIsCreateNewPaymentClicked }) => {

const handleCloseClick = ()=>{
    setIsCreateNewPaymentClicked (false)
}

const handleSaveClick = () => {
    alert ("to-do")
}

  return (
    <form>
      <div className="form-row p-5 pt-2">
        <div className="form-group d-grid align-items-start col-md-3"></div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-end pb-3 pe-3">
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseClick}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateNewPayment;
