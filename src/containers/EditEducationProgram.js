import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailEducationProgramCom from "../components/detailEducationProgram/DetailEducationProgramCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";

class DetailEducationProgramTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="8"
              title="Chương trình đào tạo"
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
            <DetailEducationProgramCom />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, {})(DetailEducationProgramTmp);
