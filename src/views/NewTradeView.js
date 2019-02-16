import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
export default class OffersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAddress: "",
      partnerAddress: this.props.match.params.address
        ? this.props.match.params.address
        : "",
      newPartnerAddress: this.props.match.params.address
        ? this.props.match.params.address
        : ""
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
            <Col>
              {React.createElement(
                withRouter(({ history }) => (
                  <Button
                    variant="danger"
                    className=""
                    onClick={() => history.push("/offers")}
                  >
                    Back
                  </Button>
                ))
              )}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="6">
              <InputGroup>
                <FormControl disabled value={this.state.myAddress} readOnly />
                <InputGroup.Append>
                  <Button variant="secondary">Refresh</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col md="6">
              <InputGroup>
                <FormControl
                  value={this.state.newPartnerAddress}
                  onChange={e =>
                    this.setState({ newPartnerAddress: e.target.value })
                  }
                />

                <InputGroup.Append>
                  {React.createElement(
                    withRouter(({ history }) => (
                      <Button
                        variant="secondary"
                        className=""
                        onClick={() => {
                          history.push(
                            "/trade/" + this.state.newPartnerAddress
                          );
                          this.setState({
                            partnerAddress: this.state.newPartnerAddress
                          });
                        }}
                      >
                        Load
                      </Button>
                    ))
                  )}
                </InputGroup.Append>
              </InputGroup>
              <div />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
