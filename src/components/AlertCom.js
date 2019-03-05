import React from "react";
import { Alert } from "shards-react";

export default class AlertCom extends React.Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);
    this.state = { visible: true, message: "" };
  }

  componentWillReceiveProps = nextProps => {
    // if (nextProps.message !== this.state.message)
    this.setState({ message: nextProps.message, visible: true });
  };

  dismiss = () => {
    this.setState({ visible: false });
  };

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
          {this.state.message}{" "}
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
}
