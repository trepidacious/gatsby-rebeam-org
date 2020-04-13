import React from "react";

import logo from "../images/icons/icon.svg";
import hero from "../images/hero.svg";
import { Container, Row, Col } from "react-bootstrap";

const Hero: React.FunctionComponent<{title: string, subtitle: string}> = ({ title, subtitle }) => (
  <div className="hero">
    <img
      className="hero-svg-bg"
      src={hero}
      alt="Hero"
      width="500px"
      height="333px"
      style={{ position: "absolute", right: "0", top: "57px" }}
    />
    <Container>
      <Row>
        <Col>
          <h1 className="hero-h1">
            <img
              className="hero-logo"
              src={logo}
              alt="Logo"
              width="60px"
              height="60px"
            />
            {title}
          </h1>
          <p>{subtitle}</p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Hero;
