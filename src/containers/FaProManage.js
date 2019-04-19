import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import FaProManageCom from "../components/faProManage/FaProManageCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as majorsAction from "../actions/majorsAction";
import * as levelsAction from "../actions/levelsAction";

class FaProManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.props.onLoadMajors();
    this.props.onLoadLevels();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="QUẢN LÝ KHOA HỆ"
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
            <FaProManageCom
              faculties={this.props.faculties}
              programs={this.props.programs}
              majors={this.props.majors}
              levels={this.props.levels}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  faculties: state.faculties,
  programs: state.programs,
  levels: state.levels,
  majors: state.majors
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadMajors: majorsAction.onLoadMajors,
  onLoadLevels: levelsAction.onLoadLevels
})(FaProManageTemp);
