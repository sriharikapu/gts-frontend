import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Fortmatic from "fortmatic";
import Web3 from "web3";
import { BrowserRouter } from "react-router-dom";

const contractAddress = "0x9a5130bc117c2e58be19d9246ae87487d9685c79";
const contractAbi = require("./utils/abi.json");

const fm = new Fortmatic("pk_test_7A6DD1EB8EE45B75");

// Post EIP-1102 update which MetaMask no longer injects web3
if (window.ethereum) {
  // Use MetaMask provider
  window.web3 = new Web3(window.ethereum);
} else {
  // Use Fortmatic provider
  window.web3 = new Web3(fm.getProvider());
}

if (window.web3.currentProvider.enable)
  window.web3.currentProvider.enable().then(alert);
else if (window.ethereum.enable) window.ethereum.enable().then(console.log);

if (window.web3) {
  window.GTS = new web3.eth.Contract(contractAbi, contractAddress);
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
