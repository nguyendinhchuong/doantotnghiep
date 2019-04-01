import React from "react";
import { Row, Col } from "shards-react";

import '../../assets/target-education.css'

import * as logic from '../../business/logicEducationProgram'
import ContentProgram from '../detailEducationProgram/ContentProgram'


export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <ContentProgram />
          </Col>
        </Row>
      </div>
    );
  }
}
