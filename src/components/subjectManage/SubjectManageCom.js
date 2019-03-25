import React, { Component } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormSelect,
  FormInput
} from "shards-react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

import * as logic from "../../business";

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
      type: { id: "0" }
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

  handleTypeChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const nameType = event.nativeEvent.target[index].text;
      this.setState({ type: { id, nameType } });
    }
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      this.state.subjectCode !== "" &&
      this.state.nameSubject !== "" &&
      !isNaN(this.state.credits) &&
      !isNaN(this.state.theory) &&
      !isNaN(this.state.practice) &&
      !isNaN(this.state.exercise) &&
      this.state.type.id !== "0"
    ) {
      let SubjectCode = this.state.subjectCode;
      let NameSubject = this.state.nameSubject;
      let Credits = parseInt(this.state.credits, 10);
      let Theory = parseInt(this.state.theory, 10);
      let Practice = parseInt(this.state.practice, 10);
      let Exercise = parseInt(this.state.exercise, 10);
      let NameType = this.state.type.nameType;
      let data = {
        SubjectCode,
        NameSubject,
        Credits,
        Theory,
        Practice,
        Exercise,
        NameType
      };
      this.props.onAddSubject(data);
      this.setState({
        visible: false
      });
    }
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
              value={this.state.nameOutcome}
              onChange={this.handleNameOutcomeChange}
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
              value={this.state.name}
              onChange={this.handleSchoolYearChange}
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
            Loại học phần:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormSelect onChange={e => this.handleTypeChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              <option key={1} value={"BB"}>
                Bắt buộc
              </option>
              <option key={2} value={"TC"}>
                Tự chọn
              </option>
            </FormSelect>
          </Col>
        </Row>
      </Dialog>
    );

    return (
      <div className="p-grid content-section implementation">
        <Row>
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">playlist_add</i> Thêm học phần
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <TableHeaderCom />
                  </thead>
                  <tbody>
                    {Array.isArray(this.props.outcomeStandards) &&
                    this.props.outcomeStandards.length !== 0 ? (
                      this.props.outcomeStandards.map((row, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{row.NameOutcomeStandard}</td>
                          <td>{row.NameFaculty}</td>
                          <td>{row.NameProgram}</td>
                          <td>{row.NameUser}</td>
                          <td>{row.SchoolYear}</td>
                          <td>{logic.formatDate(row.DateCreated)}</td>
                          <td>{logic.formatDate(row.DateEdited)}</td>
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
