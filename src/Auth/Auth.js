import React from "react";
import { Container, Col, Row } from "reactstrap";
import Signup from "../home/Signup";
import Login from "../home/Login";

const Auth = (props) => {
  return (
    <Container className="text-center">
      <Row>
        <Col md={{ span: 6, offset: 5 }} >
          <Signup updateToken={props.updateToken}/>
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col md={{ span: 6, offset: 5 }} >
          <Login updateToken={props.updateToken}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
