import React, { Component } from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavProfile from ".//NavProfile";
import NavbarDivider from "./NavbarDivider";

export default class Header extends Component {
  render() {
    return (
      <Navbar expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Global Trade System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" navbar>
            <Nav.Link>Offers</Nav.Link>
            <Nav.Link>Inventory</Nav.Link>
            <Nav.Link>Settings</Nav.Link>
            <NavbarDivider />
            <NavDropdown
              title={<NavProfile />}
              id="basic-nav-dropdown"
              alignRight={true}
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
