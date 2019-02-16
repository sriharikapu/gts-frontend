import React, { Component } from "react";

import Blockie from "react-blockies";

import "./NavProfile.css";

export default class NavProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }
  async componentDidMount() {
    this.setState({ address: (await window.web3.eth.getAccounts())[0] });
  }
  render() {
    return (
      <span>
        <Blockie seed={this.state.address} className="NavProfile-blockie" />
        {this.state.address}
      </span>
    );
  }
}
