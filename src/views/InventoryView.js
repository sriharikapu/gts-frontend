import React, { Component } from "react";
import ItemBox from "../components/ItemBox";

import "./InventoryView.css";

const items = [
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 0 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 23 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 31 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 83 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 123 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 321 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 456 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 567 },
  { emitter: "0xC79a5808Ede2DE4e1154235742f6266Dd5e48982", tokenId: 899 }
];

export default class InventoryView extends Component {
  constructor(props) {
    super(props);
    this.state = { items: null };
  }
  componentDidMount() {
    this.refresh();
  }
  async refresh() {
    this.setState({
      items: await new Promise(resolve => {
        setTimeout(() => {
          resolve(items);
        }, 2000);
      })
    });
  }
  render() {
    return (
      <div className="InventoryView">
        {this.state.items
          ? this.state.items.map(i => (
              <ItemBox
                key={i.tokenId}
                emitter={i.emitter}
                tokenId={i.tokenId}
              />
            ))
          : "Loading"}
      </div>
    );
  }
}
