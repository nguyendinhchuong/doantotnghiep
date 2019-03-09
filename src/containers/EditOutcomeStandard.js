import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/detailOutcomeStandard/DetailOutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";

import { connect } from "react-redux";

class EditOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.onLoadDetailOutcomeStandard(id);
    this.props.onLoadOutcomeStandard(id);
  };

  render() {
    const tmp = JSON.stringify(this.props.message);
    const message = tmp.substring(1, tmp.length - 1);

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const infoOS = this.props.infoOutcomeStandard;
    const subtitle = Array.isArray(infoOS)
      ? `Khoa: ${infoOS[0].NameFaculty} | Hệ: ${infoOS[0].NameProgram}`
      : `Khoa: Chưa tải được | Hệ: Chưa tải được`;

    const title = Array.isArray(infoOS)
      ? `Sửa chuẩn đầu ra: ${infoOS[0].NameOutcomeStandard}`
      : `Sửa chuẩn đầu ra: Chưa tải được`;

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
              onSaveDetailOutcomeStandard={
                this.props.onSaveDetailOutcomeStandard
              }
              idOutcomeStandard={id}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              infoOutcomeStandard={Array.isArray(infoOS) ? infoOS[0] : null}
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
  onSaveDetailOutcomeStandard:
    detailOutcomeStandardAction.onSaveDetailOutcomeStandard,
  onLoadDetailOutcomeStandard:
    detailOutcomeStandardAction.onLoadDetailOutcomeStandard,
  onLoadOutcomeStandard: outcomeStandardsAction.onLoadOutcomeStandard
})(EditOutcomeStandardTmp);
