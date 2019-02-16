import React, { Component } from "react";

import { Container, Form, InputGroup, Button } from "react-bootstrap";

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
            <InputGroup className="mb-3">
              <Form.Control
                readOnly
                ref={text => (this.tradeLink = text)}
                value={
                  location.protocol +
                  "//" +
                  location.host +
                  "/trade/" +
                  this.state.address
                }
              />
              <InputGroup.Append>
                <Button
                  variant="secondary"
                  onClick={e => {
                    console.log(e);
                    this.tradeLink.select();
                    document.execCommand("copy");
                    e.target.focus();
                  }}
                >
                  Copy
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Container>
      </div>
    );
  }
}
