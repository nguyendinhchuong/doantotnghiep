import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import SubjectManageCom from "../components/subjectManage/SubjectManageCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";
import * as subjectsAction from "../actions/subjectsAction";

class SubjectManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadSubjects();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title="HỌC PHẦN"
              subtitle="danh sách"
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
            <SubjectManageCom
              subjects={this.props.subjects}
              onDeleteSubject={this.props.onDeleteSubject}
              onAddSubject={this.props.onAddSubject}
              onAddSubjectBulk={this.props.onAddSubjectBulk}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  subjects: state.subjects
});

export default connect(mapStateToProps, {
  onLoadSubjects: subjectsAction.onLoadSubjects,
  onDeleteSubject: subjectsAction.onDeleteSubject,
  onAddSubject: subjectsAction.onAddSubject,
  onAddSubjectBulk: subjectsAction.onAddSubjectBulk
})(SubjectManageTemp);
