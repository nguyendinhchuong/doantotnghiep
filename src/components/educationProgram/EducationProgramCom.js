import React, { Component } from "react";

import { Row, Col, Button, FormSelect, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

export default class EduProgramCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nameEduProgram: "",
      level: { id: "0" },
      program: { id: "0" },
      major: { Id: "0" },
      facultyId: 0,
      schoolYear: ""
    };
  }

  onOpenAdd = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.props.onLoadMajors();
    this.props.onLoadLevels();
    this.setState({
      visible: true
    });
  };

  handleNameEduProgramChange = event => {
    this.setState({ nameEduProgram: event.target.value });
  };

  handleLevelChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ level: { id, name } });
    }
  };

  handleFacultyChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const faculty = this.props.faculties.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ facultyId: faculty ? parseInt(faculty.Id, 10) : 0 });
    }
  };

  handleMajorCodeChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const major = this.props.majors.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ major: major ? major : { Id: "0" } });
    }
  };

  handleMajorNameChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const major = this.props.majors.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ major: major ? major : { Id: "0" } });
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

  handleSchoolYearChange = event => {
    if (event.target.value.length > 4)
      this.setState({ schoolYear: event.target.value.substr(0, 4) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ schoolYear: event.target.value });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      this.state.program.id !== "0" &&
      this.state.level.id !== "0" &&
      this.state.major.Id !== "0" &&
      this.state.nameEduProgram !== "" &&
      this.state.schoolYear !== ""
    ) {
      let eduname = this.state.nameEduProgram;
      let idprogram = parseInt(this.state.program.id, 10);
      let idlevel = parseInt(this.state.level.id, 10);
      let idmajor = parseInt(this.state.major.Id, 10);
      let schoolyear = this.state.schoolYear;
      let data = {
        eduname,
        eduengname: "",
        idlevel,
        idmajor,
        idprogram,
        schoolyear,
        datecreated: new Date().toISOString(),
        dateedited: new Date().toISOString()
      };
      this.props.onAddEduProgram(data);
      this.setState({
        visible: false
      });
    }
  };

  onEdit = IdEdu => {
    this.props.history.push({
      pathname: "/education-program/edit",
      search: `?id=${IdEdu}`
    });
  };

  onDelete = IdEdu => {
    this.props.onDeleteEduProgram(IdEdu);
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
        title={<div>Thêm chương trình đào tạo</div>}
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
            Tên:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput
              type="text"
              value={this.state.nameEduPrograme}
              onChange={this.handleNameEduProgramChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Trình độ:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleLevelChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.levels)
                ? this.props.levels.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.LevelName}
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
            Mã ngành:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleMajorCodeChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorCode}
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
            Ngành:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleMajorNameChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorName}
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
            Hệ (Loại hình):
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
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Khóa tuyển:
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
      </Dialog>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">playlist_add</i> Thêm chương trình
                đào tạo
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.eduPrograms}>
              <Column field="EduName" header="Tên" />
              <Column field="LevelName" header="Trình độ" />
              <Column field="MajorCode" header="Mã ngành" />
              <Column field="MajorName" header="Ngành" />
              <Column field="NameProgram" header="Hệ (Loại hình)" />
              <Column field="SchoolYear" header="Khóa tuyển" />
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
