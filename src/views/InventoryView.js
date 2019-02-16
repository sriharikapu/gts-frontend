import React, { Component } from "react";
import ItemBox from "../components/ItemBox";
import "./InventoryView.css";

export default class InventoryView extends Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }
  componentDidMount() {
    this.refresh();
  }
  async refresh() {
    this.setState({ items: null });
    const account = (await window.web3.eth.getAccounts())[0];
    this.setState({
      items: await GTS.methods
        .getMyInventory()
        .call({ from: account, gasLimit: 10000000 })
    });
  }
  render() {
    return (
      <div className="InventoryView">
        <button onClick={() => this.refresh()}>Refresh</button>
        {this.state.items
          ? this.state.items.map(i => <ItemBox key={i} id={i} />)
          : "Loading..."}
      </div>
    );
  }
}
