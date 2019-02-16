import React, { Component } from "react";

import Blockie from "react-blockies";

import "./NavProfile.css";

export default class NavProfile extends Component {
    render() {
        return <span><Blockie seed={window.web3.eth.defaultAccount} className="NavProfile-blockie" />{window.web3.eth.defaultAccount}</span>;
    }
}