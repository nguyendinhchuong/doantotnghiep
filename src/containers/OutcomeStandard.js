import React, { Component } from "react";
import { Container, Row } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import OutcomeStandardCom from "../components/OutcomeStandardCom";

import { connect } from "react-redux";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";

class OutcomeStandard extends Component {
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

        {/*pass the history of routes to child Component*/}
        <OutcomeStandardCom history={this.props.history} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  faculties: state.faculties,
  programs: state.programs
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms
})(OutcomeStandard);
