import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  InputGroup
} from "react-bootstrap";

import ItemBox from "../components/ItemBox";

import { withRouter } from "react-router-dom";
import Inventory from "../components/Inventory";
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
        : "",
      mySelected: [],
      partnerSelected: []
    };
  }
  async componentWillMount() {
    await web3.eth
      .getAccounts()
      .then(accounts => this.setState({ myAddress: accounts[0] }));

    this.refreshMyInventory();
    this.refreshPartnerInventory();
  }
  async refreshMyInventory() {
    this.setState({ myAssets: null, mySelected: [] });
    const account = (await window.web3.eth.getAccounts())[0];
    this.setState({
      myAssets: await GTS.methods
        .getMyInventory()
        .call({ from: account, gasLimit: 10000000 })
    });
  }
  async refreshPartnerInventory() {
    this.setState({ partnerAssets: null, partnerSelected: [] });
    const account = (await window.web3.eth.getAccounts())[0];
    if (this.state.partnerAddress === "")
      return this.setState({ partnerAssets: [] });
    this.setState({
      partnerAssets: await GTS.methods
        .getUserInventory(this.state.partnerAddress)
        .call({ from: account, gasLimit: 10000000 })
    });
  }
  render() {
    return (
      <div className="NewTradeView">
        <Container className="mt-4">
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
                  <Button
                    variant="secondary"
                    onClick={() => this.refreshMyInventory()}
                  >
                    Refresh
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <div>
                <Inventory
                  items={this.state.myAssets}
                  selectable={true}
                  onSelect={i => this.toggleMySelection(i)}
                  selected={this.state.mySelected}
                />
              </div>
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
                          this.setState(
                            {
                              partnerAddress: this.state.newPartnerAddress
                            },
                            () => {
                              this.refreshPartnerInventory();
                            }
                          );
                        }}
                      >
                        Load
                      </Button>
                    ))
                  )}
                </InputGroup.Append>
              </InputGroup>
              <div>
                <Inventory
                  items={this.state.partnerAssets}
                  selectable={true}
                  onSelect={i => this.togglePartnerSelection(i)}
                  selected={this.state.partnerSelected}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ textAlign: "right" }}>
            <Col>
              <Button
                variant="success"
                className="mt-2"
                disabled={
                  this.state.mySelected.length +
                    this.state.partnerSelected.length ===
                    0 || this.state.partnerAddress === ""
                }
                onClick={async () => {
                  const account = (await window.web3.eth.getAccounts())[0];
                  GTS.methods
                    .sendTradeOffer(
                      this.state.partnerAddress,
                      this.state.mySelected,
                      this.state.partnerSelected
                    )
                    .send({ from: account });
                }}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  toggleMySelection(i) {
    let newSelected = [...this.state.mySelected];
    if (newSelected.indexOf(i) === -1) newSelected.push(i);
    else newSelected.splice(newSelected.indexOf(i), 1);
    this.setState({ mySelected: newSelected });
  }
  togglePartnerSelection(i) {
    let newSelected = [...this.state.partnerSelected];
    if (newSelected.indexOf(i) === -1) newSelected.push(i);
    else newSelected.splice(newSelected.indexOf(i), 1);
    this.setState({ partnerSelected: newSelected });
  }
}
