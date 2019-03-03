import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";

import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";

import { connect } from "react-redux";

class EditOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Sửa chuẩn đầu ra" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DetailOutcomeStandardCom
              onSaveThisOutcomeStandard={this.props.onSaveThisOutcomeStandard}
              idOutcomeStandard={id}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  onSaveThisOutcomeStandard:
    detailOutcomeStandardAction.onSaveThisOutcomeStandard
})(EditOutcomeStandardTmp);
