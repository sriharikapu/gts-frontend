import React, { Component } from "react";

import { Container, Form, InputGroup, Button } from "react-bootstrap";

export default class ProfileView extends Component {
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
    if (!this.state.address) return <div className="ProfileView" />;
    return (
      <div className="ProfileView">
        <Container className="mt-4">
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                readOnly
                ref={text => (this.userId = text)}
                value={this.state.address}
              />
              <InputGroup.Append>
                <Button
                  variant="secondary"
                  onClick={e => {
                    this.userId.select();
                    document.execCommand("copy");
                    e.target.focus();
                  }}
                >
                  Copy
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-2">
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
