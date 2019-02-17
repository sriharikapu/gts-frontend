import React, { Component } from "react";

import { Container, Button, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import OfferBox from "../components/OfferBox";

export default class OffersView extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: null };
  }
  componentDidMount() {
    this.refresh();
  }
  async refresh() {
    this.setState({ offers: null });
    const account = (await window.web3.eth.getAccounts())[0];
    const receivedOffers = (await GTS.methods
      .getMyReceivedTradeOffers()
      .call({ from: account })).map(i => ({ id: i, received: true }));
    const sentOffers = (await GTS.methods
      .getMySentTradeOffers()
      .call({ from: account })).map(i => ({ id: i, received: false }));
    this.setState({
      offers: [...receivedOffers, ...sentOffers].sort((a, b) => b.id - a.id)
    });
  }

  render() {
    return (
      <div className="OffersView">
        <Container className="mt-4">
          <div>
            <Button variant="primary" onClick={() => this.refresh()}>
              Refresh
            </Button>
            {React.createElement(
              withRouter(({ history }) => (
                <Button
                  variant="success"
                  className="ml-2"
                  onClick={() => history.push("/trade")}
                >
                  New trade
                </Button>
              ))
            )}
            {this.state.offers === null ? (
              <span style={{ marginLeft: 10 }}>Loading...</span>
            ) : (
              <span style={{ marginLeft: 10 }}>
                Total offers: {this.state.offers.length}
              </span>
            )}
          </div>
          <div>
            <Table striped bordered className="mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Partner</th>
                  <th>My assets</th>
                  <th>Their assets</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.offers &&
                  this.state.offers.map(i => (
                    <OfferBox received={i.received} key={i.id} id={i.id} />
                  ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}
