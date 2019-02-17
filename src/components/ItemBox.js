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
        className={"ItemBox" + (this.props.selected ? " ItemBox-selected" : "")}
        style={{ width: calc.width - 4, height: calc.height - 4 }}
        onClick={() => this.props.onClick()}
      >
        {this.state.data ? (
          <div style={{ wordBreak: "break-all", fontSize: 8 }}>
            <div>
              <Blockie seed={this.state.emitter} scale={2} />
              <span style={{ marginLeft: 4, fontSize: 8 }}>
                #{this.props.id}
              </span>
            </div>
            <div>{this.state.data}</div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
  calculateSize() {
    if (!this.props.containerWidth) return { width: 100, height: 100 };
    const calculated = Math.ceil(this.props.containerWidth / 100);
    return {
      width: this.props.containerWidth / calculated,
      height: this.props.containerWidth / calculated
    };
  }
  async componentWillMount() {
    const data = await GTS.methods.getAsset(this.props.id).call();
    this.setState({
      owner: data.owner,
      emitter: data.emitter,
      data: data.data
    });
  }
}
