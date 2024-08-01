/* This is the page that the user can select the month/date for the budget calculation */

import DateMenu from "../components/DateMenu";
import calenderImg from "../utilities/icons/calendar.png";

const SelectDatePage = () => {


  return (
    <div className="container col-8 d-flex justify-content-center align-items-center min-vh-100 ">
      {/* Wrap the image in a flexbox container to align it vertically */}
      <div className=" align-items-center justify-content-center ">
        <img src={calenderImg} alt="Calendar" style={{ width: 100 }} />
      </div>
      <div className="d-flex flex-column align-items-start">
        {/* Pass the callback function to DateMenu */}
        <DateMenu />
      </div>
    </div>
  );
};

export default SelectDatePage;
