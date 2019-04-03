import React from "react";
import { Row, Col } from "shards-react";

import "../../assets/target-education.css";

import ContentProgramCom from "../detailEducationProgram/ContentProgramCom";
import TargetEducationCom from "../detailEducationProgram/TargetEducationCom";
import TitleCom from "../detailEducationProgram/TitleCom";

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
            <h4 className="font-weight-bold">THÔNG TIN CHUNG</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <TitleCom />
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">1. Mục tiêu đào tạo:</h4>
          </Col>
          <Col lg="12" md="12" sm="12">
            <TargetEducationCom
              outcomeStandards={this.props.outcomeStandards}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
            />
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">2. Thời gian đào tạo: 4 năm</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">
              3. Khối lượng kiến thức toàn khóa: 137 chỉ
            </h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">4. Đối tượng tuyển sinh:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">
              5. Quy trình đào tạo, điều kiện tốt nghiệp:
            </h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">6. Cấu trúc chương trình:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">7. Nội dung chương trình:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <ContentProgramCom />
          </Col>
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">8. Kế hoạch giảng dạy dự kiến:</h4>
          </Col>
        </Row>
      </div>
    );
  }
}
