import React, { Component } from "react";

import LoginCom from "../components/LoginCom";

import { connect } from "react-redux";

class LoginTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <LoginCom />;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(LoginTemp);
