import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export default class FacultyManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      facultyName: ""
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          disabled={true}
          title="Xóa"
          onClick={() => this.props.onDeleteFaculty(data.Id)}
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

  handleFacultyName = event => {
    this.setState({ facultyName: event.target.value });
  };

  onCloseAndCreate = () => {
    if (this.state.facultyName !== "") {
      const data = { namefaculty: this.state.facultyName };
      this.props.onAddFaculty(data);
      this.setState({ visible: false });
    }
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm Khoa"
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
            Tên khoa:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.facultyName}
              onChange={this.handleFacultyName}
              placeholder="Tên..."
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
            <br />
          </Col>
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">add</i> Thêm Khoa
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.faculties}>
              <Column sortable={true} field="NameFaculty" header="Tên" />
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
