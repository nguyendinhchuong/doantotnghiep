import React, { Component } from "react";
import { Container, Button } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

export default class Errors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h3>Something went wrong!</h3>
            <p>There was a problem on our end. Please try again later.</p>
            <Button
              onClick={() => {
                this.props.history.push({
                  pathname: "/"
                });
              }}
              pill
            >
              &larr; Trở lại trang chủ
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}
