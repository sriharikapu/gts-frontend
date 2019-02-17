import React, { Component } from "react";
import ContainerDimensions from "react-container-dimensions";

import ItemBox from "./ItemBox";

export default class Inventory extends Component {
  render() {
    return (
      <ContainerDimensions>
        {({ width }) => (
          <div>
            {this.props.items &&
              this.props.items.map(i => (
                <ItemBox
                  key={i}
                  id={i}
                  selected={
                    this.props.selected && this.props.selected.indexOf(i) !== -1
                  }
                  containerWidth={width}
                  onClick={() => this.onClick(i)}
                />
              ))}
          </div>
        )}
      </ContainerDimensions>
    );
  }
  onClick(i) {
    if (this.props.selectable) this.props.onSelect(i);
    else if (this.props.onClick) this.props.onClick(i);
  }
}
