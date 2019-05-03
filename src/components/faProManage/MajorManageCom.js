import React, { Component } from "react";

import { Row, Col, Button, FormSelect, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export default class MajorManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      majorCode: "",
      majorName: "",
      faculty: {}
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          disabled={true}
          title="Xóa"
          onClick={() => this.props.onDeleteMajor(data.Id)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
  };

  onOpenAdd = () => {
    this.setState({ visible: true });
  };

  onCloseAdd = () => {
    this.setState({ visible: false });
  };

  handleMajorName = event => {
    this.setState({ majorName: event.target.value });
  };

  handleMajorCode = event => {
    this.setState({ majorCode: event.target.value });
  };

  handleFacultyChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const faculty = this.props.faculties.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ faculty: faculty ? faculty : {} });
    }
  };

  onCloseAndCreate = () => {
    if (
      this.state.majorName !== "" &&
      this.state.majorCode !== "" &&
      this.state.faculty
    ) {
      const data = {
        majorcode: this.state.majorCode,
        majorname: this.state.majorName,
        facultyid: this.state.faculty.Id
      };
      this.props.onAddMajor(data);
      this.setState({ visible: false });
    }
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm Ngành"
        visible={this.state.visible}
        style={{ width: "50vw" }}
        onHide={this.onCloseAdd}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onCloseAndCreate}
              theme="success"
            >
              Tạo
            </Button>
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onCloseAdd}
              theme="secondary"
            >
              Hủy
            </Button>
          </div>
        }
      >
        <Row>
          <Col lg="4" md="4" sm="4">
            Mã ngành:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.majorCode}
              onChange={this.handleMajorCode}
              placeholder="ACB123"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Tên ngành:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.majorName}
              onChange={this.handleMajorName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Thuộc khoa:
          </Col>
          <Col lg="8" md="8" sm="8">
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
      </Dialog>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <br />
          </Col>
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">add</i> Thêm Ngành
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.majors}>
              <Column sortable={true} field="MajorCode" header="Mã ngành" />
              <Column sortable={true} field="MajorName" header="Tên ngành" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
      </div>
    );
  }
}
