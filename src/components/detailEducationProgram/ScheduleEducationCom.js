import React from "react";
import { TreeTable } from "primereact/treetable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { Spinner } from "primereact/spinner";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { OrderList } from "primereact/orderlist";
import { Checkbox } from "primereact/checkbox";

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
      isRequired: true,
      filterSubjects: [],
      optionSubjects: [],
      listSubjects: [], // add into table
      isDialogRoot: false,
      isDialogTable: false,
      isDialogSubjectsTable: false
    };
  }
  // add
  handleAddRoot = () => {
    const data = logic.addRoot(this.state.nodes, this.state.semester);
    this.setState({ nodes: data, semester: this.state.semester + 1 });
    this.onHideDialogRoot();
  };

  handleAddChild = () => {
    this.setState({ nodes: this.addChildTable(this.state.nodes, this.state.node) });
    this.onHideDialogTable();
  }

  addChildTable = (nodes, nodeParent) => {
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
      deleteSubject={this.deleteSubjectOnTable}
      //sum={node.data.totalCredits}
      />
    );
    return node;
  };

  // Delete
  deleteNode = node => {
    const root = logic.deleteNode(this.state.nodes, node);
    this.setState({ nodes: root });
  };

  // onchange

  onChangeListSubjects = e => {
    if (typeof e.value === "object") {
      const subject = e.value;
      subject.option = this.state.isRequired ? "BB" : "TC";
      const subjects = logic.addSubjectInOnchange(
        this.state.listSubjects,
        subject
      );
      this.setState({ listSubjects: subjects });
    }
    this.setState({ optionSubjects: e.value });  
  };

  filterSubjects = e => {
    this.setState({
      filterSubjects: logic.filterSubjects(e, this.props.subjects)
    });
  };

  requiredSubjects = () =>{
    return this.state.listSubjects.filter(subject => {
      if (subject.option === "BB") {
        return subject;
      }
    });
  }

  notRequiredSubjects = () =>{
    return this.state.listSubjects.filter(subject => {
      if (subject.option === "TC") {
        return subject;
      }
    });
  }

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

  isShowDialogSubjectsTable = node =>{
    this.setState({
      isDialogSubjectsTable: true,
      node: node,
      listSubjects: []
    });
  }

  onHideDialogRoot = () => {
    this.setState({ isDialogRoot: false });
  };

  onHideDialogTable = () => {
    this.setState({
      isDialogTable: false
    });
  };

  onHideDialogSubjectsTable = () =>{
    this.setState({
      isDialogSubjectsTable: false
    });
  }
  // subjects

  deleteSubject = subject => {
    this.setState({
      listSubjects: logic.deteleSubject(this.state.listSubjects, subject)
    });
  };

  // table subject

  loadSubNode = node => {
    if (node.children) {
      const length = node.children.length;
      for (let i = 0; i < length; i++) {
        if (node.children[i].data.isTable) {
          node.children[i] = this.convertNodeToDataTable(node.children[i]);
        }
        if (node.children[i].children) {
          this.loadSubNode(node.children[i]);
        }
      }
    }
  };

  loadTreeNodes = nodes => {
    const root = [...nodes];
    const length = root.length;
    for (let i = 0; i < length; i++) {
      this.loadSubNode(root[i]);
    }
    return root;
  };

  addRowTable = () => {
    const data = this.addRowTableLogic(this.state.nodes, this.state.node, this.state.listSubjects);
    this.setState({ nodes: data });
    this.onHideDialogSubjectsTable();
  };

  addRowTableLogic = (nodes, node, subjectsAdd) => {
    if (!node.data.isTable) {
      return nodes;
    }
    let child = { ...node };
    let root = [...nodes];
    let subjectsTable = child.data.subjects;
    subjectsAdd.forEach(subject => {
      subject.parentKey = child.key;
      subjectsTable = logic.addSubjectInOnchange(subjectsTable, subject);
    });
    child.data.subjects = subjectsTable;
    child.data.totalCredits =
      logic.toltalRequiredCredits(child.data.subjects) +
      this.state.optionalCredit;
    child.data.subjects = logic.sortSubject(child.data.subjects);
    child.data.subjects = logic.indexSubjects(child.data.subjects);
    child = this.convertNodeToDataTable(child);
    root = common.updateNode(root, child);
    return root;
  };

  deleteSubjectOnTable = rowData => {
    let root = logic.deleteSubjectTable(this.state.nodes, rowData);
    root = this.loadTreeNodes(root);
    this.setState({ nodes: root });
  };

  // tempplate table

  subjectTemplate = subject => {
    return (
      <div className="p-clearfix">
        <div
          style={{
            fontSize: "14px",
            float: "left",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
        >
          {subject.SubjectName}
        </div>
        <p
          style={{
            fontSize: "14px",
            float: "right",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
          onClick={() => this.deleteSubject(subject)}
        >
          <i className="material-icons">clear</i>
        </p>
      </div>
    );
  };

  // Template
  actionTemplate(node, column) {
    return (
      <div>
        {
          !node.data.isTable ? (
            <Button
              onClick={() => this.isShowDialogTable(node)}
              theme="success"
              style={{ marginRight: ".3em", padding: "8px" }}
              title={`Thêm bảng môn học`}
            >
              <i className="material-icons">add</i>
            </Button>
          ) : (
              <Button
                onClick={() => this.isShowDialogSubjectsTable(node)}
                theme="success"
                style={{ marginRight: ".3em", padding: "8px" }}
                title={`Thêm môn học`}
              >
                <i className="material-icons">playlist_add</i>
              </Button>
            )
        }
        <Button
          onClick={() => this.deleteNode(node)}
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

  footerDialogSubjectsTable = (
    <div>
      <Button onClick={this.addRowTable} theme="success">
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
      {/* Dialog of dataTable */}
      <Dialog
          header="Thêm Nội Dung Môn Học"
          visible={this.state.isDialogSubjectsTable}
          onHide={() => this.onHideDialogSubjectsTable()}
          style={{ width: "50vw" }}
          footer={this.footerDialogSubjectsTable}
        >
          <Row>
            <Col lg="2" md="2" sm="2">
              <span>Môn Học:</span>
            </Col>
            <Col lg="6" md="6" sm="12">
              <AutoComplete
                field="SubjectName"
                value={this.state.optionSubjects}
                dropdown={true}
                onChange={e => this.onChangeListSubjects(e)}
                size={40}
                placeholder="Môn học"
                minLength={1}
                suggestions={this.state.filterSubjects}
                completeMethod={e => this.filterSubjects(e)}
              />
            </Col>
          </Row>
          <div hidden={!this.state.isRequired}>
            <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
              <Col lg="2" md="2" sm="2">
                <span>Môn Học BB:</span>
              </Col>
              <Col lg="10" md="10" sm="12">
                <OrderList
                  value={this.state.listSubjects.filter(subject => {
                    if (subject.option === "BB") {
                      return subject;
                    }
                  })}
                  responsive={true}
                  itemTemplate={this.subjectTemplate}
                />
              </Col>
            </Row>
          </div>
          <div hidden={this.state.isRequired}>
            <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
              <Col lg="2" md="2" sm="2">
                <span>Môn Học TC:</span>
              </Col>
              <Col lg="10" md="10" sm="12">
                <OrderList
                  value={this.state.listSubjects.filter(subject => {
                    if (subject.option === "TC") {
                      return subject;
                    }
                  })}
                  responsive={true}
                  itemTemplate={this.subjectTemplate}
                />
              </Col>
            </Row>
          </div>
          
          <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Col lg="2" md="2" sm="2">
              <label>Loại Học Phần:</label>
            </Col>
            <Col lg="3" md="3" sm="3">
              <Checkbox
                checked={this.state.isRequired}
                onChange={e => this.setState({ isRequired: true })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Bắt Buộc
              </label>
            </Col>
            <Col lg="2" md="2" sm="2">
              <Checkbox
                checked={!this.state.isRequired}
                onChange={e => this.setState({ isRequired: false })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Tự Chọn
              </label>
            </Col>
          </Row>
          <Row>
            <Col lg="2" md="2" sm="6">
              <label>Ghi chú: </label>
            </Col>
            <Col lg="10" md="10" sm="12">
              <InputTextarea
                rows={1}
                cols={30}
                value={this.state.note}
                onChange={e => this.setState({ note: e.target.value })}
              />
            </Col>
          </Row>
        </Dialog>
    </div>
  }
}
