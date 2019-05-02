import React from "react";
import { TreeTable } from "primereact/treetable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { Spinner } from 'primereact/spinner';

import * as logic from "../../business/logicScheduleEdu";

export default class ScheduleEducationCom extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      semester: 1,
      isDialogRoot: false
    };
  }
  // add
  handleAddRoot = () =>{
    this.onHideDialogRoot();
  }

  // show/hidden Dialong
  isShowDialogRoot = () => {
    this.setState({
      isDialogRoot: true
    });
  };

  onHideDialogRoot = () => {
    this.setState({ isDialogRoot: false });
  };

  footerRoot = (
    <div>
      <Button onClick={this.handleAddRoot} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideDialogRoot} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  render() {
    return <div>
      <TreeTable value={this.state.nodes}>
        <Column
          //field="displayName"
          header="Tên dòng"
          expander
        />
        <Column
          header={
            <Button
              onClick={() => this.isShowDialogRoot()}
              theme="success"
            >
              <i className="material-icons">add</i> Thêm học kỳ
              </Button>
          }
          style={{ textAlign: "center", width: "12em" }}
        />
      </TreeTable>

      {/* Dialog Root */}
      <Dialog
        header="Thêm học kỳ"
        visible={this.state.isDialogRoot}
        onHide={() => this.onHideDialogRoot()}
        style={{ width: "50vw" }}
        footer={this.footerRoot}
      >
      <Row>
        <Col lg="2" md="2" sm="4">
          <label>Học kỳ: </label>
        </Col>
        <Col lg="2" md="2" sm="4">
        <Spinner value={this.state.semester} onChange={(e) => this.setState({semester: e.value})} />
        </Col>
      </Row>
      </Dialog>
    </div>
  }
}
