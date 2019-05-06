import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";

export default class UserManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      roles: []
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          disabled={true}
          title="Xóa"
          onClick={() => this.props.onDelete(data.Id)}
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

  onRoleChange = e => {
    let selectedRoles = [...this.state.roles];
    if (e.checked) selectedRoles.push(e.value);
    else selectedRoles.splice(selectedRoles.indexOf(e.value), 1);

    this.setState({ roles: selectedRoles });
  };

  onCloseAndCreate = () => {
    this.setState({ visible: false });
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm người dùng"
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
          <Col lg="2" md="2" sm="2">
            Tên:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.userName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
          <Col lg="2" md="2" sm="2">
            Mail:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.userMail}
              placeholder="thienthien@gmail.com"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            Các chức vụ:{" "}
            {this.state.roles.map(ele => (
              <span style={{ color: "#007BFF" }}>{ele} . </span>
            ))}
          </Col>
          <Col lg="12" md="12" sm="12">
            <br />
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="1"
              value="Chỉnh sửa CĐR"
              onChange={this.onRoleChange}
              checked={this.state.roles.includes("Chỉnh sửa CĐR")}
            />
            <label htmlFor="1" className="p-checkbox-label">
              Chỉnh sửa CĐR
            </label>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="2"
              value="Chỉnh sửa CTĐT"
              onChange={this.onRoleChange}
              checked={this.state.roles.includes("Chỉnh sửa CTĐT")}
            />
            <label htmlFor="2" className="p-checkbox-label">
              Chỉnh sửa CTĐT
            </label>
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
                <i className="material-icons">add</i> Thêm người dùng
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.users}>
              <Column sortable={true} field="Username" header="Tên" />
              <Column sortable={true} field="Role" header="Chức vụ" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
          {dialog}
        </Row>
      </div>
    );
  }
}
