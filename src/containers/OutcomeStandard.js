import React, { Component } from "react";
import { Container, Row } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import OutcomeStandardCom from "../components/OutcomeStandardCom";
// import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";

class OutcomeStandardTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Chuẩn đầu ra"
            subtitle=""
            className="text-sm-left"
          />
        </Row>

        {/*<AlertCom message={this.props.message} />*/}

        {/*pass the history of routes to child Component*/}
        {/*get redux's dispatches and states*/}
        <OutcomeStandardCom
          history={this.props.history}
          faculties={this.props.faculties}
          programs={this.props.programs}
          outcomeStandards={this.props.outcomeStandards}
          onLoadFaculties={this.props.onLoadFaculties}
          onLoadPrograms={this.props.onLoadPrograms}
          onLoadOutcomeStandards={this.props.onLoadOutcomeStandards}
          onDeleteThisOutcomeStandard={this.props.onDeleteThisOutcomeStandard}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  faculties: state.faculties,
  programs: state.programs,
  outcomeStandards: state.outcomeStandards,
  message: state.message
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
  onDeleteThisOutcomeStandard:
    outcomeStandardsAction.onDeleteThisOutcomeStandard
})(OutcomeStandardTemp);
