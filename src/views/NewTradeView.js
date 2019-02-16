import React, { Component } from "react";
import { Container, Row, Col, FormControl } from "react-bootstrap";

export default class OffersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAddress: "",
      partnerAddress: ""
    };
  }
  componentWillMount() {
    web3.eth
      .getAccounts()
      .then(accounts => this.setState({ myAddress: accounts[0] }));
  }
  render() {
    return (
      <div className="NewTradeView">
        <Container className="mt-2">
          <Row>
            <Col md="6">
              <FormControl disabled value={this.state.myAddress} readOnly />
            </Col>
            <Col md="6">
              <FormControl
                value={this.state.partnerAddress}
                onChange={e =>
                  this.setState({ partnerAddress: e.target.value })
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
