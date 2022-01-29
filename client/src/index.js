import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataProvider from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/bootstrap-grid.css";
import "./styles/bootstrap.min.css";
import "./styles/font-awesome.css";
import "./styles/modern-business.css";
import "./styles/owl.carousel.min.css";
import "./styles/owl.theme.default.min.css";
import "./styles/simple-sidebar.css";
import "./styles/style.css";
import "./styles/Pages.css";
import "./styles/Search.css";
import "./styles/Header.css";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App style={{ position: 'relative', overflow: "hidden" }}/>
      <ToastContainer />
    
    </DataProvider>


  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
