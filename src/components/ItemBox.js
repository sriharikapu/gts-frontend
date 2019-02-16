import React, { Component } from "react";

import Blockie from "react-blockies";

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
      >
        {this.state.data ? (
          <div style={{ wordBreak: "break-all", fontSize: 8 }}>
            <Blockie seed={this.state.emitter} size={4} />
            {this.state.data}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
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
  async componentWillMount() {
    this.updateDimensions();
    const data = await GTS.methods.getAsset(this.props.id).call();
    this.setState({
      owner: data.owner,
      emitter: data.emitter,
      data: data.data
    });
  }
  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }
  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }
}
