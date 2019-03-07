import React from "react";
import { Alert } from "shards-react";

export default class AlertCom extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      visible: false,
      countdown: 0,
      timeUntilDismissed: 2,
      message: ""
    };
  }

  showAlert = () => {
    this.clearInterval();
    this.setState({ visible: true, countdown: 0, timeUntilDismissed: 3 });
    this.interval = setInterval(this.handleTimeChange, 1000);
  };

  handleTimeChange = () => {
    if (this.state.countdown < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ countdown: this.state.countdown + 1 }
      });
      return;
    }

    this.setState({ ...this.state, ...{ visible: false } });
    this.clearInterval();
  };

  clearInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ message: nextProps.message });
    this.showAlert();
  };

  render() {
    return (
      <div>
        <Alert
          theme="light"
          style={{
            cursor: "pointer",
            position: "relative"
          }}
          className="mb-3"
          open={this.state.visible}
        >
          {this.state.message}
        </Alert>
      </div>
    );
  }
}
