import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="center-content my-4">
      <Spinner variant="primary" animation="border" />
    </Container>
  );
};

export default Loader;
