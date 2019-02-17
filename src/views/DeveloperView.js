import React, { Component } from "react";

import { Container, Button, Row, Col } from "react-bootstrap";

import DevAssignItem from "../components/DevAssignItem";
import DevBurnItem from "../components/DevBurnItem";

export default class DeveloperView extends Component {
  render() {
    return (
      <div className="DeveloperView mt-4">
        <Container>
          <Row>
            <Col>
              <DevAssignItem />
            </Col>
            <Col>
              <DevBurnItem />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
