import React, { Component } from "react";

import { Container, Button } from "react-bootstrap";
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
      offers: await GTS.methods
        .getMyReceivedTradeOffers()
        .call({ from: account, gasLimit: 10000000 })
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
                  New offer
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
            {this.state.offers &&
              this.state.offers.map(i => <OfferBox key={i} id={i} />)}
          </div>
        </Container>
      </div>
    );
  }
}
