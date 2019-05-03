import React from "react";
import { TreeTable } from "primereact/treetable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { Spinner } from 'primereact/spinner';

import * as logic from "../../business/logicScheduleEdu";
import * as common from "../../business/commonEducation"

import TableScheduleSubjectCom from "./TableScheduleSubjectCom";

export default class ScheduleEducationCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      node: {},
      semester: 1,
      nodeHover: "",
      isDialogRoot: false,
      isDialogTable: false
    };
  }
  // add
  handleAddRoot = () => {
    const data = logic.addRoot(this.state.nodes, this.state.semester);
    this.setState({ nodes: data, semester: this.state.semester + 1 });
    console.log(this.state.nodes);

    this.onHideDialogRoot();
  }

  handleAddChild = () => {
    this.setState({ nodes: this.addChildTable(this.state.nodes, this.state.node) });
    this.onHideDialogTable();
  }

  addChildTable = (nodes, nodeParent) => {
    debugger;
    let data = [...nodes];
    const length = nodeParent.children.length;
    const key = `${nodeParent.key}.${length + 1}`;
    let node = {
      key: key,
      data: {
        isTable: true,
        subjects: [],
        displayName: ""
      },
      children: []
    };
    node = this.convertNodeToDataTable(node);
    nodeParent.children.push(node);
    data = common.updateNode(data, nodeParent);
    return data;
  };

  convertNodeToDataTable = node => {
    if (!node.data.isTable) {
      return node;
    }
    node.data.displayName = (
      <TableScheduleSubjectCom
        subjects={node.data.subjects}
        //deleteSubject={this.deleteSubjectOnTable}
        //sum={node.data.totalCredits}
      />
    );
    return node;
  };

  // show/hidden Dialong
  isShowDialogRoot = () => {
    this.setState({
      isDialogRoot: true
    });
  };

  isShowDialogTable = node => {
    this.setState({
      isDialogTable: true,
      node: node
    });
  };

  onHideDialogRoot = () => {
    this.setState({ isDialogRoot: false });
  };

  onHideDialogTable = () => {
    this.setState({
      isDialogTable: false
    });
  };

  // Template
  actionTemplate(node, column) {
    return (
      <div>
        <Button
          onClick={() => this.isShowDialogTable(node)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Thêm học kỳ`}
        >
          <i className="material-icons">playlist_add</i>
        </Button>
        <Button
          //onClick={() => this.deleteNode(node)}
          //onMouseOver={() => this.mouseOver(node)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Xóa cấp ${this.state.nodeHover}`}
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  }

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

  footerChildTable = (
    <div>
      <Button onClick={this.handleAddChild} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideDialogTable} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  render() {
    return <div>
      <TreeTable value={this.state.nodes}>
        <Column
          field="displayName"
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
          body={(node, column) => this.actionTemplate(node, column)}
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
            <Spinner value={this.state.semester} onChange={(e) => this.setState({ semester: e.value })} />
          </Col>
        </Row>
      </Dialog>
      {/*Dialog Table */}
      <Dialog
        header="Cấu trúc"
        visible={this.state.isDialogTable}
        onHide={() => this.onHideDialogTable()}
        style={{ width: "50vw" }}
        footer={this.footerChildTable}
      >
        <div>
          <DataTable headerColumnGroup={logic.headerGroup}>
            <Column header="STT" />
            <Column header="Loại Học Phần" />
            <Column header="Mã Môn Học" />
            <Column header="Tên Môn Học" />
            <Column header="Số Tín Chỉ" />
            <Column header="Lý Thuyết" />
            <Column header="Thực Hành" />
            <Column header="Bài Tập" />
            <Column header="Description" />
          </DataTable>
        </div>
      </Dialog>
    </div>
  }
}
