import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./utils/bootstrap.scss";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavProfile from "./components/NavProfile";
import NavbarDivider from "./components/NavbarDivider";

class App extends Component {
  render() {
    return (
      <div className="App">
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
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
