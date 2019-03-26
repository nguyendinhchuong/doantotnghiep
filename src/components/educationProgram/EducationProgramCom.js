import React from "react";
import { Button, Row, Col } from "shards-react";

export default class EducationProgramCom extends React.Component {
  onEdit = () => {
    this.props.history.push({
      pathname: "/education-program/edit"
    });
  };

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row>
          <Col lg="12" md="12" sm="12">
            <Button onClick={() => this.onEdit()} theme="success">
              <i className="material-icons">edit</i> Xem chi tiết chương trình
              đào tạo
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
