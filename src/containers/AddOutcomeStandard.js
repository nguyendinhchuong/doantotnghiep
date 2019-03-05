import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";
import DetailOutcomeStandardCom from "../components/DetailOutcomeStandardCom";
import AlertCom from "../components/AlertCom";

import { connect } from "react-redux";

class AddOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
     const message=JSON.stringify(this.props.message).substring(
        1,JSON.stringify(this.props.message).length - 1);

    console.log(this.props.location.state.faculty)
    let subtitle;
     if(this.props.location.state !== undefined){
      subtitle=this.props.location.state.faculty.name !== undefined&&this.props.location.state.program.name!==undefined
        ? `Khoa: ${this.props.location.state.faculty.name} | Hệ: ${
            this.props.location.state.program.name
          }`
        : `Khoa: Chưa có | Hệ: Chưa có`;
      
     }else{
      subtitle=`Khoa: Chưa có | Hệ: Chưa có`;
     }


    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="10" md="10" sm="10">
          <PageTitle
            sm="4"
            title="Thêm chuẩn đầu ra"
            subtitle={subtitle}
            className="text-sm-left"
          />
          </Col>
        <Col lg="2" md="2" sm="2">
          <AlertCom message={message}/>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DetailOutcomeStandardCom />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message:state.message
});

export default connect(mapStateToProps, {
})(AddOutcomeStandardTmp);