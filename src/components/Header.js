import React, { Component } from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavProfile from ".//NavProfile";
import NavbarDivider from "./NavbarDivider";
import { Link, NavLink } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }
  async componentDidMount() {
    this.setState({ address: (await window.web3.eth.getAccounts())[0] });
  }
  render() {
    return (
      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand to="/" as={Link}>
          Global Trade System
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" navbar>
            <Nav.Link exact as={NavLink} to="/">
              Inventory
            </Nav.Link>
            <Nav.Link as={NavLink} to="/offers">
              Offers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
              Profile
            </Nav.Link>
            <NavbarDivider show="sm" />
            <NavDropdown
              title={<NavProfile />}
              id="basic-nav-dropdown"
              alignRight={true}
            >
              <NavDropdown.Header>{this.state.address}</NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/developer">
                Developer
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
