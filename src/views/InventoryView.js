import React, { Component } from "react";
import Inventory from "../components/Inventory";
import "./InventoryView.css";
import { Container, Button, Form } from "react-bootstrap";

import ContainerDimensions from "react-container-dimensions";

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
        <Container className="pt-2">
          <div>
            <Button type="success" onClick={() => this.refresh()}>
              Refresh
            </Button>
            {!this.state.items ? (
              <span style={{ marginLeft: 10 }}>Loading...</span>
            ) : (
              <span style={{ marginLeft: 10 }}>
                Total items: {this.state.items.length}
              </span>
            )}
          </div>
          {/*this.state.items && (
            <div>
              <Form.Group
                className="mt-2"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label>Show items of asset emitter</Form.Label>
                <Form.Control as="select">
                  <option key="*" value="*">
                    All
                  </option>
                  {this.getEmitters(this.state.items).map(e => (
                    <option key={e.address} value={e.address}>
                      {e.address}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
                  )*/}
          <div className="mt-2 mb-2">
            <Inventory items={this.state.items} />
          </div>
        </Container>
      </div>
    );
  }
  getEmitters(items) {
    let seen = {};
    let emitters = [];
    items.forEach(i => {
      if (!seen[i.emitter]) {
        seen[i.emitter] = true;
        emitters.push(i.emitter);
      }
    });
    return emitters.sort().map(e => ({ address: e }));
  }
}
