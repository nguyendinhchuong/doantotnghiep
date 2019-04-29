import React from "react";
import PropTypes from "prop-types";
import { Container } from "shards-react";

const Plain = ({ children, noNavbar, noFooter }) => (
  <Container>{children}</Container>
);

Plain.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool
};

Plain.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default Plain;
