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

import * as logic from "../business";

import TableHeaderCom from "./TableHeaderCom";

export default class OutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculty: { id: "0" },
      program: { id: "0" },
      visible: false,
      nameOutcome: ""
    };
  }

  onOpenAdd = () => {
    this.setState({
      visible: true
    });
  };

  handleNameOutcomeChange = event => {
    this.setState({ nameOutcome: event.target.value });
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

  onCloseAddCreate = () => {
    if (
      this.state.faculty.id !== "0" &&
      this.state.program.id !== "0" &&
      this.state.nameOutcome !== ""
    ) {
      let NameFaculty = this.state.faculty.name;
      let NameProgram = this.state.program.name;
      let NameOutcome = this.state.nameOutcome;
      let data = { NameFaculty, NameProgram, NameOutcome };
      this.props.onCreateFacultyProgram(data);
      if (this.props.message !== "Tạo CĐR thất bại") {
        this.props.history.push({
          pathname: "/outcome-standard/add",
          // search: `?faculty=${this.state.faculty}&program=${this.state.program}`,
          state: {
            faculty: this.state.faculty,
            program: this.state.program,
            nameOutcome: this.state.nameOutcome
          }
        });
      }

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

  onCreateExcelFile = IdOutcome => {
    this.props.onLoadThisOutcomeStandard(IdOutcome);
    if (this.props.detailOutcomeStandard !== {}) {
    }
  };

  render() {
    let dialog;
    if (this.state.visible) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          animation="slide-fade"
          maskAnimation="fade"
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
              onClick={this.onCloseAddCreate}
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
              Khoa:
            </Col>
            <Col lg="9" md="9" sm="9">
              <FormSelect onChange={e => this.handleFacultyChange(e)}>
                <option selected value={0}>
                  Chọn...
                </option>
                {Array.isArray(this.props.faculties)
                  ? this.props.faculties.map((item, i) => {
                      return (
                        <option value={item.Id}>{item.NameFaculty}</option>
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
                <option selected value={0}>
                  Chọn...
                </option>
                {Array.isArray(this.props.programs)
                  ? this.props.programs.map((item, i) => {
                      return (
                        <option value={item.Id}>{item.NameProgram}</option>
                      );
                    })
                  : null}
              </FormSelect>
            </Col>
          </Row>
        </Dialog>
      );
    }
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
                  <thead className="bg-light"><TableHeaderCom /></thead>
                  <tbody>
                    {Array.isArray(this.props.outcomeStandards) &&
                    this.props.outcomeStandards.length !== 0 ? (
                      this.props.outcomeStandards.map((row, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{row.NameOutcomeStandard}</td>
                          <td>{logic.formatDatetime(row.DateCareated)}</td>
                          <td>{logic.formatDatetime(row.DateEdited)}</td>
                          <td>{row.NameFaculty}</td>
                          <td>{row.NameProgram}</td>
                          <td>
                            <Button
                              title="Chỉnh sửa"
                              onClick={() => this.onEdit(row.IdOutcome)}
                            >
                              <i className="material-icons">edit</i>
                            </Button>
                          </td>
                          <td>
                            <Button title="Tạo bản sao">
                              <i className="material-icons">file_copy</i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              title="Xóa"
                              onClick={() =>
                                this.props.onDeleteThisOutcomeStandard(
                                  row.IdOutcome
                                )
                              }
                            >
                              <i className="material-icons">delete</i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              title="Tạo file Excel"
                              onClick={() =>
                                this.onCreateExcelFile(row.IdOutcome)
                              }
                            >
                              <i className="material-icons">save_alt</i>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Chưa có dữ liệu</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
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
