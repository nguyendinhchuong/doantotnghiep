import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import OutcomeStandardCom from "../components/OutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";
import * as facProAction from "../actions/FacProAction";

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
    const message = JSON.stringify(this.props.message).substring(
      1,
      JSON.stringify(this.props.message).length - 1
    );
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title="Chuẩn đầu ra"
              subtitle="danh sách"
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={message} />
          </Col>
        </Row>

        {/*pass the history of routes to child Component*/}
        {/*get redux's dispatches and states*/}
        <OutcomeStandardCom
          message={message}
          history={this.props.history}
          faculties={this.props.faculties}
          programs={this.props.programs}
          outcomeStandards={this.props.outcomeStandards}
          detailOutcomeStandard={this.props.detailOutcomeStandard}

          onDeleteThisOutcomeStandard={this.props.onDeleteThisOutcomeStandard}
          onCreateFacultyProgram={this.props.onCreateFacultyProgram}
          onLoadThisOutcomeStandard={this.props.onLoadThisOutcomeStandard}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  faculties: state.faculties,
  programs: state.programs,
  outcomeStandards: state.outcomeStandards,
  message: state.message,
  detailOutcomeStandard: state.detailOutcomeStandard
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
  onDeleteThisOutcomeStandard:
    outcomeStandardsAction.onDeleteThisOutcomeStandard,
  onCreateFacultyProgram: facProAction.onCreateFacultyProgram,
  onLoadThisOutcomeStandard:
    detailOutcomeStandardAction.onLoadThisOutcomeStandard,
})(OutcomeStandardTemp);
