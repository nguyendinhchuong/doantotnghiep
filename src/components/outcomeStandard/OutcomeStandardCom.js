import React, { Component } from "react";

import {
  Row,
  Col,
  Button,
  FormSelect,
  FormInput
} from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
        DateCreated: new Date().toISOString(),
        DateEdited: new Date(),
        SchoolYear
      };
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

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Chỉnh sửa"
          onClick={() => this.onEdit(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">edit</i>
        </Button>
        <Button
          title="Xóa"
          onClick={() => this.onDelete(data.Id)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
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
                <i className="material-icons">playlist_add</i> Thêm chuẩn đầu ra
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.outcomeStandards}>
              <Column field="NameOutcomeStandard" header="Tên" />
              <Column field="NameFaculty" header="Khoa" />
              <Column field="NameProgram" header="Hệ" />
              <Column field="NameUser" header="Người tạo" />
              <Column field="SchoolYear" header="Năm học" />
              <Column field="SchoolYear" header="Tiết bài tập" />
              <Column field="SchoolYear" header="Tiết bài tập" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "8em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
      </div>
    );
  }
}
