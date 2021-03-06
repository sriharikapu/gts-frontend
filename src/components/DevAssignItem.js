import React, { Component } from "react";

import { FormControl, Button } from "react-bootstrap";

import Swal from "sweetalert2";

export default class DevAssignItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      data: "",
      recipient: ""
    };
  }
  async componentDidMount() {
    this.setState({ address: (await web3.eth.getAccounts())[0] });
  }
  render() {
    const { data, recipient } = this.state;
    return (
      <div className="DevAssignItem">
        <FormControl
          className="mt-2"
          placeholder="address"
          value={recipient}
          onChange={e => this.setState({ recipient: e.target.value })}
        />
        <FormControl
          className="mt-2"
          placeholder="data"
          value={data}
          onChange={e => this.setState({ data: e.target.value })}
        />
        <Button
          name="assign"
          className="mt-2"
          onClick={async () => this.assign()}
        >
          Assign
        </Button>
      </div>
    );
  }

  async assign() {
    Swal.fire({
      title: "Emitting asset...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const { address, data, recipient } = this.state;

    const bytes = window.web3.utils.hexToBytes(
      window.web3.utils.asciiToHex(data)
    );
    const txReceipt = await GTS.methods
      .assign(recipient, bytes)
      .send({ from: address })
      .on("transactionHash", () => {
        Swal.fire({
          title: "Asset emitted",
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
  }
}
