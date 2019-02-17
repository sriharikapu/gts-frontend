import React, { Component } from "react";

import { FormControl, Button } from "react-bootstrap";

import Swal from "sweetalert2";

export default class DevBurnItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      assetId: ""
    };
  }
  async componentDidMount() {
    this.setState({ address: (await web3.eth.getAccounts())[0] });
  }
  render() {
    const { assetId } = this.state;
    return (
      <div className="DevAssignItem">
        <FormControl
          className="mt-2"
          placeholder="assetId"
          name="assetId"
          value={assetId}
          onChange={e => this.setState({ assetId: e.target.value })}
        />
        <Button name="burn" className="mt-2" onClick={async () => this.burn()}>
          Burn
        </Button>
      </div>
    );
  }

  async burn() {
    Swal.fire({
      title: "Burning asset...",
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const { address, assetId } = this.state;

    const txReceipt = await GTS.methods
      .burn(assetId)
      .send({ from: address })
      .on("transactionHash", () => {
        Swal.fire({
          title: "Asset burnt",
          text:
            "However, Ethereum network may need some time to reflect new state.",
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
