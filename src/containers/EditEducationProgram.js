import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailEducationProgramCom from "../components/detailEducationProgram/DetailEducationProgramCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as levelsAction from "../actions/levelsAction";
import * as majorsAction from "../actions/majorsAction";
import * as programsAction from "../actions/programsAction";
import * as eduProgramsAction from "../actions/eduProgramsAction";

class DetailEducationProgramTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.onLoadLevels();
    this.props.onLoadMajors();
    this.props.onLoadPrograms();
    this.props.onLoadEduProgram(id);
  };

  render() {
    const infoEduProgram = Array.isArray(this.props.infoEduProgram)
      ? this.props.infoEduProgram[0]
      : null;

    const title = infoEduProgram
      ? `${infoEduProgram.EduName}`
      : `Chưa tải được`;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title={title}
              subtitle="Chỉnh sửa"
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col lg="12" md="12">
            <DetailEducationProgramCom
              levels={this.props.levels}
              majors={this.props.majors}
              programs={this.props.programs}
              infoEduProgram={this.props.infoEduProgram}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  outcomeStandards: state.outcomeStandards,
  detailOutcomeStandard: state.detailOutcomeStandard,
  levels: state.levels,
  majors: state.majors,
  programs: state.programs,
  infoEduProgram: state.infoEduProgram
});

export default connect(mapStateToProps, {
  onLoadLevels: levelsAction.onLoadLevels,
  onLoadMajors: majorsAction.onLoadMajors,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadEduProgram: eduProgramsAction.onLoadEduProgram
})(DetailEducationProgramTmp);
