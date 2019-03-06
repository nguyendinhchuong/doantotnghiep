import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";

import { connect } from "react-redux";

class AddOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const message = JSON.stringify(this.props.message).substring(
      1,
      JSON.stringify(this.props.message).length - 1
    );

    let subtitle;
    if (this.props.location.state !== undefined) {
      subtitle =
        this.props.location.state.faculty.name !== undefined &&
        this.props.location.state.program.name !== undefined
          ? `Khoa: ${this.props.location.state.faculty.name} | Hệ: ${
              this.props.location.state.program.name
            }`
          : `Khoa: Chưa có | Hệ: Chưa có`;
    } else {
      subtitle = `Khoa: Chưa có | Hệ: Chưa có`;
    }

    let title =
      this.props.location.state !== undefined
        ? `Thêm chuẩn đầu ra: ${this.props.location.state.nameOutcome}`
        : `Thêm chuẩn đầu ra`;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title={title}
              subtitle={subtitle}
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={message} />
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DetailOutcomeStandardCom
              onAddThisOutcomeStandard={this.props.onAddThisOutcomeStandard}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  detailOutcomeStandard: state.detailOutcomeStandard,
  message: state.message
});

export default connect(mapStateToProps, {
  onAddThisOutcomeStandard: detailOutcomeStandardAction.onAddThisOutcomeStandard
})(AddOutcomeStandardTmp);
