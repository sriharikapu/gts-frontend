import React, { Component } from "react";

import "./OfferBox.css";
import ItemBox from "./ItemBox";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default class OfferBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: null,
      recipient: null,
      my_assets: null,
      their_assets: null,
      state: null
    };
  }
  async componentDidMount() {
    const offer = await GTS.methods.getTradeOffer(this.props.id).call();
    this.setState({
      sender: offer.sender,
      recipient: offer.recipient,
      my_assets: offer.my_assets,
      their_assets: offer.their_assets,
      state: offer.state
    });
  }
  render() {
    return this.state.sender !== null ? this.renderBox() : this.renderLoading();
  }
  renderBox() {
    const { sender, recipient, my_assets, their_assets, state } = this.state;
    console.log(this.state);
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.received ? "RECEIVED" : "SENT"}</td>
        <td>{this.props.received ? sender : recipient}</td>
        <td>
          {(this.props.received ? their_assets : my_assets).map(i => (
            <ItemBox key={i} id={i} />
          ))}
        </td>
        <td>
          {(this.props.received ? my_assets : their_assets).map(i => (
            <ItemBox key={i} id={i} />
          ))}
        </td>
        <td>{OfferBox.stateToString(state)}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
  renderLoading() {
    return <div className="OfferBox">Loading...</div>;
  }
  renderActions() {
    if (parseInt(this.state.state, 10) !== 0) {
      return "-";
    }

    if (this.props.received) {
      return (
        <span>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Accepting trade offer...",
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                  Swal.showLoading();
                }
              });
              GTS.methods
                .acceptTradeOffer(this.props.id)
                .send({ from: this.state.sender })
                .on("transactionHash", () => {
                  Swal.fire({
                    title: "Offer accepted!",
                    text:
                      "However, Ethereum network may need some time to reflect the acceptation.",
                    type: "success"
                  });
                })
                .catch(err => {
                  Swal.fire({
                    title: "An error occurred.",
                    text: err,
                    type: "error"
                  });
                });
            }}
            className="d-inline"
            variant="success"
          >
            Accept
          </Button>{" "}
          <Button
            onClick={() => {
              Swal.fire({
                title: "Declining trade offer...",
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                  Swal.showLoading();
                }
              });
              GTS.methods
                .declineTradeOffer(this.props.id)
                .send({ from: this.state.sender })
                .on("transactionHash", () => {
                  Swal.fire({
                    title: "Offer declined!",
                    text:
                      "However, Ethereum network may need some time to reflect the decline.",
                    type: "success"
                  });
                })
                .catch(err => {
                  Swal.fire({
                    title: "An error occurred.",
                    text: err,
                    type: "error"
                  });
                });
            }}
            className="d-inline"
            variant="danger"
          >
            Decline
          </Button>
        </span>
      );
    } else {
      return (
        <div>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Cancelling trade offer...",
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                  Swal.showLoading();
                }
              });
              GTS.methods
                .cancelTradeOffer(this.props.id)
                .send({ from: this.state.sender })
                .on("transactionHash", () => {
                  Swal.fire({
                    title: "Offer cancelled!",
                    text:
                      "However, Ethereum network may need some time to reflect the cancellation.",
                    type: "success"
                  });
                })
                .catch(err => {
                  Swal.fire({
                    title: "An error occurred.",
                    text: err,
                    type: "error"
                  });
                });
            }}
            variant="danger"
          >
            Cancel
          </Button>
        </div>
      );
    }
  }
  static stateToString(state) {
    switch (parseInt(state, 10)) {
      case 0:
        return "PENDING";
      case 1:
        return "CANCELLED";
      case 2:
        return "ACCEPTED";
      case 3:
        return "DECLINED";
      default:
        return "UNKNOWN";
    }
  }
}
