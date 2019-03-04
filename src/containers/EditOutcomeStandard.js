import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";

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
    this.props.onLoadInfoOutcomeStandard(id);
    this.props.onLoadThisOutcomeStandard(id);
  };

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let subtitle = Array.isArray(this.props.infoOutcomeStandard)
      ? `Khoa: ${this.props.infoOutcomeStandard[0].NameFaculty} | Hệ: ${
          this.props.infoOutcomeStandard[0].NameProgram
        }`
      : `Khoa: Chưa có | Hệ: Chưa có`;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Sửa chuẩn đầu ra"
            subtitle={subtitle}
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DetailOutcomeStandardCom
              onSaveThisOutcomeStandard={this.props.onSaveThisOutcomeStandard}
              idOutcomeStandard={id}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  infoOutcomeStandard: state.infoOutcomeStandard,
  detailOutcomeStandard: state.detailOutcomeStandard
});

export default connect(mapStateToProps, {
  onSaveThisOutcomeStandard:
    detailOutcomeStandardAction.onSaveThisOutcomeStandard,
  onLoadThisOutcomeStandard:
    detailOutcomeStandardAction.onLoadThisOutcomeStandard,
  onLoadInfoOutcomeStandard:
    infoOutcomeStandardAction.onLoadInfoOutcomeStandard
})(EditOutcomeStandardTmp);
