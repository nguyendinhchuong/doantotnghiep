import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import OutcomeStandardCom from "../components/outcomeStandard/OutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as infoOutcomeStandardAction from "../actions/infoOutcomeStandardAction";

class OutcomeStandardTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.props.onLoadOutcomeStandards();
  };

  render() {
    const tmp = JSON.stringify(this.props.message);
    const message = tmp.substring(1, tmp.length - 1);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title="CHUẨN ĐẦU RA"
              subtitle="danh sách"
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={message} />
          </Col>
        </Row>

        <OutcomeStandardCom
          history={this.props.history}
          message={message}
          faculties={this.props.faculties}
          programs={this.props.programs}
          outcomeStandards={this.props.outcomeStandards}
          onCreateInfoOutcomeStandard={this.props.onCreateInfoOutcomeStandard}
          onDeleteOutcomeStandard={this.props.onDeleteOutcomeStandard}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  faculties: state.faculties,
  programs: state.programs,
  outcomeStandards: state.outcomeStandards
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
  onDeleteOutcomeStandard: outcomeStandardsAction.onDeleteOutcomeStandard,
  onCreateInfoOutcomeStandard:
    infoOutcomeStandardAction.onCreateInfoOutcomeStandard
})(OutcomeStandardTemp);
