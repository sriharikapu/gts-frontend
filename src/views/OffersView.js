import React, { Component } from "react";

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
      items: await GTS.methods
        .getMyOffers()
        .call({ from: account, gasLimit: 10000000 })
    });
  }

  render() {
    return (
      <div className="OffersView">
        {" "}
        <button onClick={() => this.refresh()}>Refresh</button>
        {this.state.items
          ? this.state.items.map(i => <ItemBox key={i} id={i} />)
          : "Loading..."}
      </div>
    );
  }
}
