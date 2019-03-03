import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";

export default class EditOutcomeStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let subtitle =
      this.props.location.state !== undefined
        ? `Khoa: ${this.props.location.state.data.NameFaculty} | Hệ: ${
            this.props.location.state.data.NameProgram
          }`
        : `Khoa: Chưa có | Hệ: Chưa có | ${id}`;

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
            <DetailOutcomeStandardCom />
          </Col>
        </Row>
      </Container>
    );
  }
}
