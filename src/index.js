import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Fortmatic from "fortmatic";
import Web3 from "web3";

const fm = new Fortmatic('pk_test_7A6DD1EB8EE45B75');

if(!window.web3)
    window.web3 = new Web3(fm.getProvider());

if(window.ethereum)
    window.ethereum.enable();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
