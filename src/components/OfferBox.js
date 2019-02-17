import React, { Component } from "react";

import "./OfferBox.css";
import ItemBox from "./ItemBox";

export default class OfferBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: null,
      recipient: null,
      my_assets: null,
      their_assets: null,
      state: null
    };
  }
  async componentDidMount() {
    const offer = await GTS.methods.getTradeOffer(this.props.id).call();
    this.setState({
      sender: offer.sender,
      recipient: offer.recipient,
      my_assets: offer.my_assets,
      their_assets: offer.their_assets,
      state: offer.state
    });
  }
  render() {
    return this.state.sender !== null ? this.renderBox() : this.renderLoading();
  }
  renderBox() {
    const { sender, recipient, my_assets, their_assets, state } = this.state;
    console.log(this.state);
    return (
      <div className="OfferBox">
        {sender} {recipient}{" "}
        {my_assets.map(i => (
          <ItemBox key={i} id={i} />
        ))}{" "}
        {their_assets.map(i => (
          <ItemBox key={i} id={i} />
        ))}{" "}
        {OfferBox.stateToString(state)}
      </div>
    );
  }
  renderLoading() {
    return <div className="OfferBox">Loading...</div>;
  }
  static stateToString(state) {
    switch (parseInt(state, 10)) {
      case 0:
        return "PENDING";
      case 1:
        return "CANCELLED";
      case 2:
        return "ACCEPTED";
      case 3:
        return "DECLINED";
      default:
        return "UNKNOWN";
    }
  }
}
