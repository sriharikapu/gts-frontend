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
    this.setState({
      offers: (await GTS.methods
        .getMyReceivedTradeOffers()
        .call({ from: account, gasLimit: 10000000 })).sort((a, b) => b - a)
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
            <Table striped bordered className="mt-2" variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Sender</th>
                  <th>My assets</th>
                  <th>Their assets</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.offers &&
                  this.state.offers.map(i => <OfferBox key={i} id={i} />)}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}
