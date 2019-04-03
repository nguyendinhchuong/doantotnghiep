import React, { Component } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormInput,
  FormTextarea
} from "shards-react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

import DataInputCom from "./DataInputCom";
import TableHeaderCom from "./TableHeaderCom";
import TdsCom from "./TdsCom";

export default class SubjectManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      subjectCode: "",
      nameSubject: "",
      credits: "",
      theory: "",
      practice: "",
      exercise: "",
      description: ""
    };
  }

  onOpenAdd = () => {
    this.setState({ visible: true });
  };

  handleSubjectCode = event => {
    this.setState({ subjectCode: event.target.value });
  };

  handleNameSubject = event => {
    this.setState({ nameSubject: event.target.value });
  };

  handleCredits = event => {
    this.setState({ credits: event.target.value });
  };

  handleTheory = event => {
    this.setState({ theory: event.target.value });
  };

  handlePractice = event => {
    this.setState({ practice: event.target.value });
  };

  handleExercise = event => {
    this.setState({ exercise: event.target.value });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      !isNaN(parseInt(this.state.credits, 10)) &&
      !isNaN(parseInt(this.state.theory, 10)) &&
      !isNaN(parseInt(this.state.practice, 10)) &&
      !isNaN(parseInt(this.state.exercise, 10)) &&
      this.state.subjectCode !== "" &&
      this.state.nameSubject !== "" &&
      this.state.description !== ""
    ) {
      let subjectcode = this.state.subjectCode;
      let subjectname = this.state.nameSubject;
      let credit = parseInt(this.state.credits, 10);
      let theoryperiod = parseInt(this.state.theory, 10);
      let practiceperiod = parseInt(this.state.practice, 10);
      let exerciseperiod = parseInt(this.state.exercise, 10);
      let description = this.state.description;
      let datecreated = new Date().toISOString();
      let dateedited = new Date().toISOString();
      let data = {
        subjectcode,
        subjectname,
        subjectengname: "",
        credit,
        theoryperiod,
        practiceperiod,
        exerciseperiod,
        description,
        datecreated,
        dateedited
      };
      this.props.onAddSubject(data);
      this.setState({
        visible: false
      });
    }
  };

  onShowDetail = IdSubject => {
    // this.props.onDeleteSubject(IdSubject);
  };

  onDelete = IdSubject => {
    this.props.onDeleteSubject(IdSubject);
  };

  render() {
    const dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCloseAdd}
        style={{ width: 520 }}
        title={<div>Thêm học phần</div>}
        footer={[
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onCloseAdd}
            theme="light"
          >
            Hủy
          </Button>,
          <Button
            type="button"
            className="btn btn-primary"
            key="save"
            onClick={this.onCloseAndCreate}
            theme="success"
          >
            Tạo
          </Button>
        ]}
      >
        <Row>
          <Col lg="4" md="4" sm="4">
            Mã học phần:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.subjectCode}
              onChange={this.handleSubjectCode}
              placeholder="MTH003"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Tên học phần:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.nameSubject}
              onChange={this.handleNameSubject}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tín chỉ:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.credits}
              onChange={this.handleCredits}
              placeholder="4"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết lý thuyết:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.theory}
              onChange={this.handleTheory}
              placeholder="20"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết thực hành:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.practice}
              onChange={this.handlePractice}
              placeholder="30"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết bài tập:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.exercise}
              onChange={this.handleExercise}
              placeholder="40"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Mô tả môn học:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormTextarea
              value={this.state.description}
              onChange={this.handleDescription}
            />
          </Col>
        </Row>
      </Dialog>
    );

    return (
      <div>
        <Row>
          <Col lg="2" md="2" sm="2">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">playlist_add</i> Thêm học phần
              </Button>
            </p>
          </Col>
          <Col lg="6" md="6" sm="6" />
          <Col lg="2" md="2" sm="2">
            <label
              onClick={this.onShowExportCom}
              style={{
                float: "right",
                borderRadius: "8px",
                border: "1px solid #17C671",
                display: "inline-block",
                color: "#17C671",
                padding: "6px",
                cursor: "pointer"
              }}
            >
              <i className="material-icons">save_alt</i> Tạo file Excel
            </label>
          </Col>
          <Col lg="2" md="2" sm="2">
            <DataInputCom handleFile={this.handleFile} />
          </Col>
          <Col lg="12" md="12" sm="12">
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <TableHeaderCom />
                  </thead>
                  <tbody>
                    {Array.isArray(this.props.subjects) &&
                    this.props.subjects.length !== 0 ? (
                      this.props.subjects.map((row, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{row.SubjectCode}</td>
                          <td>{row.SubjectName}</td>
                          <td>{row.Credit}</td>
                          <td>{row.TheoryPeriod}</td>
                          <td>{row.PracticePeriod}</td>
                          <td>{row.ExercisePeriod}</td>
                          <td>
                            <Button
                              title="Xem chi tiết"
                              onClick={() => this.onShowDetail(row.Id)}
                              theme="success"
                            >
                              <i className="material-icons">search</i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              title="Xóa"
                              onClick={() => this.onDelete(row.Id)}
                              theme="secondary"
                            >
                              <i className="material-icons">delete</i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <TdsCom />
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {dialog}
      </div>
    );
  }
}
