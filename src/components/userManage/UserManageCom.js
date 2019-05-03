import React, { Component } from "react";

import { Row, Col } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default class UserManageCom extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <br />
          </Col>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.users}>
              <Column sortable={true} field="Username" header="Tên" />
              <Column sortable={true} field="Role" header="Chức vụ" />
            </DataTable>
          </Col>
        </Row>
      </div>
    );
  }
}
