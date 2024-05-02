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
            <PayeeBox />
            <PayeeBox />
            <PayeeBox /> <PayeeBox />
            <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox /> <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox />
            <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox /> <PayeeBox />
            <PayeeBox /> <PayeeBox />
          </section>
          <section id="statistics-section"></section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
