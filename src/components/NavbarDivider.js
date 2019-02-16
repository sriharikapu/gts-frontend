import React, { Component } from "react";

import "./NavbarDivider.css";

export default class NavbarDivider extends Component {
  render() {
    return (
      <div className={"NavbarDivider d-none d-" + this.props.show + "-block"} />
    );
  }
}
