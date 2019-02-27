import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import AddOutcomeStandardCom from "../components/AddOutcomeStandardCom";

export default class OutcomeStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let subtitle =
      this.props.location.state !== undefined
        ? `Khoa: ${this.props.location.state.faculty} | Hệ: ${
            this.props.location.state.level
          }`
        : `Khoa: Chưa có | Hệ: Chưa có`;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Thêm chuẩn đầu ra"
            subtitle={subtitle}
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <AddOutcomeStandardCom />
          </Col>
        </Row>
      </Container>
    );
  }
}
