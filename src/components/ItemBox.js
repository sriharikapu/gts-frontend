import React, { Component } from "react";

import "./ItemBox.css";

export default class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }
  render() {
    const calc = this.calculateSize();
    return (
      <div
        className="ItemBox"
        style={{ width: calc.width - 4, height: calc.height - 4 }}
      />
    );
  }
  calculateSize() {
    const { width, height } = this.state;
    const calculated = Math.ceil(width / 100);
    return { width: width / calculated, height: width / calculated };
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }
  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }
}
