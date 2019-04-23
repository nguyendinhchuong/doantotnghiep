import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

export default class ProgramManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      programName: ""
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xóa"
          onClick={() => this.props.onDeleteProgram(data.Id)}
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

  handleProgramName = event => {
      this.setState({ programName: event.target.value });
  };

  onCloseAndCreate = () => {
    if (this.state.programName !== "") {
      const data = { programname: this.state.programName };
      this.props.onAddProgram(data);
      this.setState({ visible: false });
    }
  };

  render() {
    const dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCloseAdd}
        style={{ width: 520 }}
        title={<div>Thêm Hệ</div>}
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
            Tên hệ:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.programName}
              onChange={this.handleProgramName}
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
                <i className="material-icons">add</i> Thêm Hệ
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.programs}>
              <Column sortable={true} field="NameProgram" header="Tên" />
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
