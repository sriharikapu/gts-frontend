import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Fortmatic from "fortmatic";
import Web3 from "web3";

const fm = new Fortmatic("pk_test_7A6DD1EB8EE45B75");

// Post EIP-1102 update which MetaMask no longer injects web3
if (window.ethereum) {
  // Use MetaMask provider
  window.web3 = new Web3(window.ethereum);
} else {
  // Use Fortmatic provider
  window.web3 = new Web3(fm.getProvider());
}

if (window.web3.currentProvider.enable) window.web3.currentProvider.enable();
if (window.ethereum.enable) window.ethereum.enable();

if (window.web3) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
