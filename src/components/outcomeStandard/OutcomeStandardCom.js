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

export default class OutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculty: { id: "0" },
      program: { id: "0" },
      visible: false,
      schoolYear: ""
    };
  }

  onOpenAdd = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.setState({
      visible: true
    });
  };

  handleNameOutcomeChange = event => {
    this.setState({ nameOutcome: event.target.value });
  };

  handleSchoolYearChange = event => {
    this.setState({ schoolYear: event.target.value });
  };

  handleFacultyChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ faculty: { id, name } });
    }
  };

  handleProgramChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ program: { id, name } });
    }
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      this.state.faculty.id !== "0" &&
      this.state.program.id !== "0" &&
      this.state.nameOutcome !== "" &&
      this.state.schoolYear !== ""
    ) {
      let NameOutcomeStandard = this.state.nameOutcome;
      let IdFaculty = parseInt(this.state.faculty.id, 10);
      let IdProgram = parseInt(this.state.program.id, 10);
      let SchoolYear = this.state.schoolYear;
      let data = {
        IdFaculty,
        IdProgram,
        IdUser: 1,
        NameOutcomeStandard,
        SchoolYear,
        DateCreated: new Date(),
        DateEdited: new Date()
      };
      console.log(data);
      this.props.onAddOutcomeStandard(data);
      this.setState({
        visible: false
      });
    }
  };

  onEdit = IdOutcome => {
    this.props.history.push({
      pathname: "/outcome-standard/edit",
      search: `?id=${IdOutcome}`
    });
  };

  onDelete = IdOutcome => {
    this.props.onDeleteOutcomeStandard(IdOutcome);
  };

  render() {
    const dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCloseAdd}
        style={{ width: 520 }}
        title={<div>Thêm chuẩn đầu ra</div>}
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
          <Col lg="3" md="3" sm="3">
            Chuẩn đầu ra:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput
              type="text"
              value={this.state.nameOutcome}
              onChange={this.handleNameOutcomeChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Năm học:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput
              type="text"
              value={this.state.schoolYear}
              onChange={this.handleSchoolYearChange}
              placeholder="2015"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Khoa:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleFacultyChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.faculties)
                ? this.props.faculties.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameFaculty}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Hệ:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleProgramChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.programs)
                ? this.props.programs.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameProgram}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
      </Dialog>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">add</i> Thêm
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
                          <td>{logic.formatDatetime(row.DateCreated)}</td>
                          <td>{logic.formatDatetime(row.DateEdited)}</td>
                          <td>
                            <Button
                              title="Chỉnh sửa"
                              onClick={() => this.onEdit(row.Id)}
                            >
                              <i className="material-icons">edit</i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              title="Xóa"
                              onClick={() => this.onDelete(row.Id)}
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
