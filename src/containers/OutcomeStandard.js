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

class OutcomeStandardTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadOutcomeStandards();
  };

  render() {
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
            <AlertCom message={this.props.message} />
          </Col>
        </Row>

        <OutcomeStandardCom
          history={this.props.history}
          faculties={this.props.faculties}
          programs={this.props.programs}
          outcomeStandards={this.props.outcomeStandards}
          onLoadFaculties={this.props.onLoadFaculties}
          onLoadPrograms={this.props.onLoadPrograms}
          onAddOutcomeStandard={this.props.onAddOutcomeStandard}
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
  onAddOutcomeStandard: outcomeStandardsAction.onAddOutcomeStandard
})(OutcomeStandardTemp);
