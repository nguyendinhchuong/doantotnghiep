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
// import { InputText } from "primereact/inputtext";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

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

  getCurDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  };

  duplicateOS = index => {
    let copyOS = {};
    copyOS.index = this.state.rows.length + 1;
    if (this.state.rows[index].name.includes("Copy of")) {
      copyOS.name = this.state.rows[index].name;
    } else {
      copyOS.name = "Copy of " + this.state.rows[index].name;
    }
    copyOS.create_date = this.getCurDate();
    copyOS.modify_date = this.getCurDate();
    copyOS.faculty = this.state.rows[index].faculty;
    copyOS.system = this.state.rows[index].system;
    this.setState({
      rows: this.state.rows.concat(copyOS)
    });
  };

  deleteOS = index => {
    console.log(index);
    this.state.rows.splice(index, 1);
    this.setState({
      rows: this.state.rows
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
      this.props.history.push({
        pathname: "/outcome-standard/add",
        // search: `?faculty=${this.state.faculty}&program=${this.state.program}`,
        state: {
          faculty: this.state.faculty,
          program: this.state.program,
          nameOutcome: this.state.nameOutcome
        }
      });

      this.setState({
        visible: false
      });
    }
  };

  onEdit = row => {
    this.props.history.push({
      pathname: "/outcome-standard/edit",
      search: `?id=${row.IdOutcome}`
    });
  };

  // ex 2015-03-04T00:00:00.000Z
  formatDatetime = date => {
    const d = new Date(date);
    const dateTime = [
      d.getFullYear(),
      d.getMonth(),
      d.getDay(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    ];
    return `${dateTime[0]}-${dateTime[1]}-${dateTime[2]} ${dateTime[3]}:${
      dateTime[4]
    }:${dateTime[5]}`;
  };

  componentDidMount = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.props.onLoadOutcomeStandards();
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

    let tableHeader = (
      <tr>
        <th scope="col" className="border-0">
          STT
        </th>
        <th scope="col" className="border-0">
          Tên
        </th>
        <th scope="col" className="border-0">
          Ngày tạo
        </th>
        <th scope="col" className="border-0">
          Ngày sửa
        </th>
        <th scope="col" className="border-0">
          Khoa
        </th>
        <th scope="col" className="border-0">
          Hệ
        </th>
        <th scope="col" className="border-0" />
        <th scope="col" className="border-0" />
        <th scope="col" className="border-0" />
        <th scope="col" className="border-0" />
      </tr>
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
                  <thead className="bg-light">{tableHeader}</thead>
                  <tbody>
                    {Array.isArray(this.props.outcomeStandards) &&
                    this.props.outcomeStandards.length !== 0 ? (
                      this.props.outcomeStandards.map((row, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{row.NameOutcome}</td>
                          <td>{this.formatDatetime(row.DateCareated)}</td>
                          <td>{this.formatDatetime(row.DateEdited)}</td>
                          <td>{row.NameFaculty}</td>
                          <td>{row.NameProgram}</td>
                          <td>
                            <Button
                              title="Chỉnh sửa"
                              onClick={() => this.onEdit(row)}
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
                            <Button title="Tạo file Excel">
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
