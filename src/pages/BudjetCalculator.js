import React from "react";
import "./pageStyles/budjetCalculator.css";
import PayeeBox from "./../components/PayeeBox";

function HomePage() {
  return (
    <div id="budjet-calculator-page">
      <div id="calculator-page-wrapper">
        <section id="menu-section"></section>
        <div id="content-wrapper">
          <section id="payee-section">
            <div id="payee-section-headers">
              <div id="fixed-bills-section-header">
                <h3>fixed bills</h3>
              </div>
              <div id="one-time-bills-section-header">
                <h3>One time bills</h3>
              </div>
            </div>
            <div id="all-payee-wrapper">
              <div id="fixed-bills-section">
                <div id="fixed-bills-display">
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox /> <PayeeBox />
                  <PayeeBox /> <PayeeBox />
                </div>
              </div>
              <div id="one-time-bills-section">
                <div id="one-time-bills-display">
                  <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox />
                  <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                  <PayeeBox /> <PayeeBox /> <PayeeBox />
                  <PayeeBox />
                </div>
              </div>
            </div>
            <div></div>
          </section>
          <section id="statistics-section"></section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
