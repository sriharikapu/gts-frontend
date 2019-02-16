import React, { Component } from "react";

import { ItemBox } from "../components/ItemBox";

export default class OffersView extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: null };
  }
  componentDidMount() {
    this.refresh();
  }
  async refresh() {
    this.setState({ offers: null });
    const account = (await window.web3.eth.getAccounts())[0];
    this.setState({
      offers: await GTS.methods
        .getMyOffers()
        .call({ from: account, gasLimit: 10000000 })
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="OffersView">
        <button onClick={() => this.refresh()}>Refresh</button>
        {this.state.offers
          ? this.state.offers.map(i => <span>{i}</span>)
          : "Loading..."}
      </div>
    );
  }
}
