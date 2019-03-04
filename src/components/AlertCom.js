import React from "react";
import { Alert } from "shards-react";

export default class AlertCom extends React.Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);
    this.state = { visible: true };
  }

  render() {
    return (
      <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
        {this.props.message}
        <Alert
          open={this.state.visible}
          style={{
            cursor: "pointer",
            width: "auto",
            margin: "0 auto",
            position: "relative"
          }}
        >
          {}{" "}
          <i
            onClick={this.dismiss}
            style={{ cursor: "pointer" }}
            className="material-icons"
          >
            close
          </i>
        </Alert>
      </div>
    );
  }

  dismiss() {
    this.setState({ visible: false });
  }
}
