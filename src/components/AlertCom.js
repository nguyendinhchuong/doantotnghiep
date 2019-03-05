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
        <Alert
          theme="light"
          open={this.state.visible}
          style={{
            cursor: "pointer",
            width: "auto",
            margin: "0 auto",
            position: "relative"
          }}
        >
          {this.props.message}{" "}
        </Alert>
      </div>
    );
  }

  dismiss() {
    // this.setState({ visible: false });
  }
          // <i
          //   onClick={this.dismiss}
          //   style={{ cursor: "pointer" }}
          //   className="material-icons"
          // >
          //   close
          // </i>
}
