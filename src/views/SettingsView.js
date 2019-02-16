import React, { Component } from "react";

import { Container, Form } from "react-bootstrap";

export default class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }
  componentWillMount() {
    web3.eth
      .getAccounts()
      .then(accounts => this.setState({ address: accounts[0] }));
  }
  render() {
    return (
      <div className="SettingsView">
        <Container className="mt-2">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Trade link</Form.Label>
            <Form.Control
              value={"http://localhost/trade/" + this.state.address}
            />
          </Form.Group>
        </Container>
      </div>
    );
  }
}
