import React, { Component } from "react";

import LoginCom from "../components/LoginCom";

import { connect } from "react-redux";
import * as authentication from "../actions/authenticationAction";

class LoginTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LoginCom onLogIn={this.props.onLogIn} onLogOut={this.props.onLogOut} />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  onLogIn: authentication.onLogIn,
  onLogOut: authentication.onLogOut
})(LoginTemp);
