import React, { Component } from "react";

import "./OfferBox.css";

export default class OfferBox extends Component {
  render() {
    return <div className="OfferBox">{this.props.id}</div>;
  }
}
