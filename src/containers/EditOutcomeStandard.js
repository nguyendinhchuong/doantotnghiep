import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";
import * as infoOutcomeStandardAction from "../actions/infoOutcomeStandardAction";

import { connect } from "react-redux";

class EditOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.onLoadThisOutcomeStandard(id);
    this.props.onLoadInfoOutcomeStandard(id);
  };

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const message = JSON.stringify(this.props.message).substring(
      1,
      JSON.stringify(this.props.message).length - 1
    );

    let subtitle = Array.isArray(this.props.infoOutcomeStandard)
      ? `Khoa: ${this.props.infoOutcomeStandard[0].NameFaculty} | Hệ: ${
          this.props.infoOutcomeStandard[0].NameProgram
        }`
      : `Khoa: Chưa có | Hệ: Chưa có`;

    let title = Array.isArray(this.props.infoOutcomeStandard)
      ? `Sửa chuẩn đầu ra: ${
          this.props.infoOutcomeStandard[0].NameOutcomeStandard
        }`
      : null;

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
              onSaveThisOutcomeStandard={this.props.onSaveThisOutcomeStandard}
              idOutcomeStandard={id}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              infoOutcomeStandard={
                Array.isArray(this.props.infoOutcomeStandard)
                  ? this.props.infoOutcomeStandard[0]
                  : null
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  infoOutcomeStandard: state.infoOutcomeStandard,
  detailOutcomeStandard: state.detailOutcomeStandard,
  message: state.message
});

export default connect(mapStateToProps, {
  onSaveThisOutcomeStandard:
    detailOutcomeStandardAction.onSaveThisOutcomeStandard,
  onLoadThisOutcomeStandard:
    detailOutcomeStandardAction.onLoadThisOutcomeStandard,
  onLoadInfoOutcomeStandard: infoOutcomeStandardAction.onLoadInfoOutcomeStandard
})(EditOutcomeStandardTmp);
