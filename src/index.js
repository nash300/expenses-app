import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetProvider } from "./context files/BudgetProvider";
import "../src/Styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
    ,
  </React.StrictMode>
);
